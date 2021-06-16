import { FormField, MaskedInput, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const PhoneInput = ({
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
        onChange={event => onChange(name, event.target.value)}
        value={value}
        id={name}
        name={name}
        type={type}
        mask={[
          { fixed: "+65" },
          { fixed: " " },
          {
            length: 4,
            regexp: /^[0-9]{1,4}$/,
            placeholder: "xxx",
          },
          { fixed: "-" },
          {
            length: 4,
            regexp: /^[0-9]{1,4}$/,
            placeholder: "xxxx",
          },
        ]}
      />
    </FormField>
  )
}

export default PhoneInput

PhoneInput.defaultProps = {
  name: "PhoneInput",
  type: "text",
  label: "PhoneInput Label",
  required: false,
  error: "",
}

PhoneInput.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
