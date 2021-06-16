import { FormField, MaskedInput, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const EmailInput = ({
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
        onChange={event =>
          onChange(
            name,
            event.target.value
              ? event.target.value.toLowerCase()
              : event.target.value
          )
        }
        value={value}
        id={name}
        name={name}
        type={type}
        mask={[
          { regexp: /^[\w\-_.]+$/, placeholder: "address" },
          { fixed: "@" },
          { regexp: /^[\w]+$/, placeholder: "email" },
          { fixed: "." },
          { regexp: /^[\w]+$/, placeholder: "com" },
          { fixed: "." },
          { regexp: /^[\w]+$/, placeholder: "sg" },
        ]}
        {...rest}
      />
    </FormField>
  )
}

export default EmailInput

EmailInput.defaultProps = {
  name: "EmailInput",
  type: "text",
  label: "EmailInput Label",
  required: false,
  error: "",
}

EmailInput.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
