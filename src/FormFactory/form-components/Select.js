import { select } from "@redux-saga/core/effects"
import { Select as GrommetSelect, FormField, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

const Select = ({
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
  onChange,
  value,
  disabled,
  ...rest
}) => {
  const [searchString, setSearchString] = React.useState("")

  const _onChange = ({ value, option }) => {
    if (option && option.action) {
      option.action({
        value: value.split(" ")[0],
        option,
        category: option.category,
      })
    } else {
      onChange(name, value)
    }
  }

  const filteredChoices = choices.filter(choice =>
    searchString === ""
      ? true
      : choice.display_name
          .toLowerCase()
          .includes(searchString.toLowerCase()) &&
        !choices.action &&
        choices.value !== "DisplayOnly"
  )

  return (
    <FormField
      label={label}
      name={name}
      help={
        <Text color="dark-4" dangerouslySetInnerHTML={{ __html: help_text }} />
      }
      info={alert}
      required={required}
      htmlFor={name}
      validate={validators}
      error={
        error && (
          <Text size="small" color="status-critical">
            {error}
          </Text>
        )
      }
    >
      <GrommetSelect
        {...rest}
        name={name}
        onChange={_onChange}
        value={value}
        disabled={!disabled ? ["DisplayOnly"] : disabled}
        options={filteredChoices}
        valueKey={{
          key: "value",
          reduce: e => {},
        }}
        labelKey={"display_name"}
        onSearch={s => {
          setSearchString(s)
        }}
      />
    </FormField>
  )
}

export default Select

Select.defaultProps = {
  name: "Select",
  type: "text",
  label: "Select Label",
  required: false,
  error: "",
  value: "",
}

Select.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  value: PropTypes.string,
}
