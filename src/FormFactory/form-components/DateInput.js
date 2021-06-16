import { FormField, MaskedInput, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const DateInput = ({
  error,
  alert,
  type,
  help_text,
  required,
  label,
  validators,
  parsers,
  name,
  onChange,
  value,
  ...rest
}) => {
  const daysInMonth = (year, month) => new Date(year, month, 0).getDate()

  var currentYear = new Date().getFullYear()

  return (
    <FormField
      label={label}
      name={name}
      help={
        <Text color="dark-4" dangerouslySetInnerHTML={{ __html: help_text }} />
      }
      info={alert}
      required={required}
      validate={validators}
      htmlFor={name}
      error={
        error && (
          <Text size="small" color="status-critical">
            {error}
          </Text>
        )
      }
    >
      <MaskedInput
        {...rest}
        mask={[
          {
            length: 4,
            options: Array.from({ length: 100 }, (v, k) => currentYear - k),
            regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
            placeholder: "YYYY",
          },
          { fixed: "-" },
          {
            length: [1, 2],
            options: Array.from({ length: 12 }, (v, k) => k + 1),
            regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
            placeholder: "MM",
          },
          { fixed: "-" },
          {
            length: [1, 2],
            options: Array.from(
              {
                length:
                  value &&
                  daysInMonth(
                    parseInt(value.split("-")[0], 10),
                    parseInt(value.split("-")[1], 10)
                  ),
              },
              (v, k) => k + 1
            ),
            regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
            placeholder: "DD",
          },
        ]}
        value={value || ""}
        onChange={event => onChange(name, event.target.value)}
        name={name}
      />
    </FormField>
  )
}

export default DateInput

DateInput.defaultProps = {
  name: "DateInput",
  type: "text",
  label: "DateInput Label",
  required: false,
  error: "",
}

DateInput.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
