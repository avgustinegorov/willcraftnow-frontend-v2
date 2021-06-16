import { FormField, TextInput, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const PasswordInput = ({
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
      <TextInput
        onChange={event => onChange(name, event.target.value)}
        value={value}
        id={name}
        name={name}
        {...rest}
        type={"password"}
      />
    </FormField>
  )
}

export default PasswordInput

PasswordInput.defaultProps = {
  name: "PasswordInput",
  type: "text",
  label: "PasswordInput Label",
  required: false,
  error: "",
}

PasswordInput.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
