import { Calendar as CalendarIcon } from "grommet-icons"
import { FormField, Box, TextInput, Layer, Text } from "grommet"
import PropTypes from "prop-types"
import React from "react"

// Yes, these are for the odd but conventional U.S. way of representing dates.
const MONTHS = ["[2-9]", "0[1-9]", "1[0-2]"]
const DAYS = ["[4-9]", "0[1-9]", "[1-2][0-9]", "3[0-1]"]
const MONTH_REGEXP = new RegExp(MONTHS.map(m => `^${m}$`).join("|"))
const MONTH_DAY_REGEXP = new RegExp(
  DAYS.map(d => MONTHS.map(m => `^${m}/${d}$`).join("|")).join("|")
)
const MONTH_DAY_YEAR_REGEXP = new RegExp("^(\\d{1,2})/(\\d{1,2})/(\\d{4})$")

const Input = ({
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
  const [state, setState] = React.useState({})

  const onInput = event => {
    const { text } = state
    let {
      target: { value },
    } = event
    let date
    const match = value.match(MONTH_DAY_YEAR_REGEXP)
    if (match) {
      date = new Date(
        match[3],
        parseInt(match[1], 10) - 1,
        match[2]
      ).toISOString()
    } else if (value.length > text.length) {
      // never add characters if the user is backspacing
      // add trailing '/' when it looks appropriate
      if (value.match(MONTH_REGEXP)) {
        value = `${value}/`
      } else if (value.match(MONTH_DAY_REGEXP)) {
        value = `${value}/`
      }
    }
    setState({ text: value, date, active: true })
  }

  const onSelect = isoDate => {
    const date = new Date(isoDate)
    const text = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`
    setState({ date, text, active: false })
  }

  const { active, date, text } = state

  return (
    <Box>
      <FormField
        label={label}
        name={name}
        help={
          <Text
            color="dark-4"
            dangerouslySetInnerHTML={{ __html: help_text }}
          />
        }
        info={alert}
        required={required}
        validate={validators}
        htmlFor={name}
        error={error}
      >
        <TextInput
          id="date-input"
          placeholder="MM/DD/YYYY"
          value={text}
          onInput={onInput}
          onFocus={() => {
            setState({ active: true })
          }}
        />
        {active && (
          <Layer align="end">
            <Box border width="large">
              <CalendarIcon />
            </Box>
          </Layer>
        )}
      </FormField>
    </Box>
  )
}

export default Input

Input.defaultProps = {
  name: "Input",
  type: "text",
  label: "Input Label",
  required: false,
  error: "",
}

Input.propTypes = {
  name: PropTypes.object.isRequired,
  name: PropTypes.string,
  type: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["text", "email", "url", "tel", "number", "password"]),
  label: PropTypes.object.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
}
