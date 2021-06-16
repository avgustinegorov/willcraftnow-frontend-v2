import { FormField, TextArea as GrommetTextArea } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const TextArea = ({
  error,
  data,
  name,
  type,
  help_text,
  required,
  label,
  validators,
  parsers,
}) => {
  return (
    <FormField
      label={label}
      name={name}
      help={help_text}
      info={help_text}
      required={required}
      validate={validators}
      htmlFor={name}
      error={error}
    >
      <GrommetTextArea
        id={name}
        name={name}
        type={name.includes("password") ? "password" : type}
      />
    </FormField>
  )
}

export default TextArea

TextArea.defaultProps = {
  name: "TextArea",
  type: "text",
  label: "TextArea Label",
  required: false,
  error: "",
}

TextArea.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
