import { FormField, RadioButtonGroup, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const Radio = ({
  error,
  alert,
  type,
  help_text,
  required,
  label,
  validators,
  choices,
  parsers,
  name,
  disabled,
  onChange,
  value,
  ...rest
}) => {
  const _choices = choices.map(({ value, display_name }) => ({
    id: value,
    name: display_name,
    value: String(value),
    label: display_name,
  }))

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
      <RadioButtonGroup
        disabled={disabled}
        name={name}
        options={_choices}
        value={value}
        onChange={event => onChange(name, event.target.value)}
      />
    </FormField>
  )
}

export default Radio

Radio.defaultProps = {
  name: "Radio",
  type: "text",
  label: "Radio Label",
  required: false,
  error: "",
}

Radio.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
