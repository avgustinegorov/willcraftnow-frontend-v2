import React from "react"
import { Box, CheckBox, Button, Form, Text } from "grommet"
import PropTypes from "prop-types"

import { Trans } from "@lingui/macro"

import { isEmpty } from "./utils"
import DateInput from "./form-components/DateInput"
import Dots from "../components/Dots"
import EmailInput from "./form-components/EmailInput"
import Input from "./form-components/Input"
import PasswordInput from "./form-components/PasswordInput"
import PhoneInput from "./form-components/PhoneInput"
import Radio from "./form-components/Radio"
import Select from "./form-components/Select"

import { useDispatch } from "react-redux"
import { cancelForm } from "../reducers/forms/actions"
import { useInitFormFactory } from "./useInitFormFactory"
import { useErrors } from "./useErrors"
import { useSubmit } from "./useSubmit"

const nullifyEmpty = values => {
  Object.keys(values).forEach(key =>
    !isEmpty(values[key]) ? values[key] : null
  )
  return values
}

const getErrorMessage = error => {
  let _error = error
  if (_error && Array.isArray(_error)) {
    _error = _error[0]
  }

  if (_error && typeof _error === "object") {
    _error = _error.message
  }

  return _error
}

const FormFactory = props => {
  const {
    formService,
    errors,
    onCancel,
    onChange,
    isSubmitted: isSubmittedProp,
    disableIsSubmitted,
  } = props
  const {
    isLoading,
    initialFormData,
    initialFormValues,
    validateFormValues,
  } = useInitFormFactory(formService)
  const dispatch = useDispatch()
  const [formValues, setFormValues] = React.useState(initialFormValues)
  const { isSubmitted } = useSubmit({ isSubmittedProp })
  const [errorState, clearErrorState] = useErrors({
    errors,
    options: formService.options || {},
  })

  const _onChange = (fieldName, fieldvalue) => {
    const updatedFormValues = {
      ...formValues,
      [fieldName]: fieldvalue,
    }

    clearErrorState(fieldName)

    setFormValues(updatedFormValues)
    onChange && onChange(updatedFormValues)
  }

  const _onCancel = e => {
    onCancel && typeof onCancel === "function"
      ? onCancel(e)
      : dispatch(cancelForm(e))
  }

  const _onSubmit = ({ value, touched }) => {
    Object.keys(value).forEach(fieldName => {
      if (initialFormData[fieldName].isHiddenField(value))
        delete value[fieldName]
    })
    // prevent form submission
    const { isValid } = validateFormValues(value)

    if (isValid) {
      console.log("SUBMITTING")
      formService.submit && formService.submit(nullifyEmpty(value))
    }
  }

  if (isLoading)
    return (
      <Box fill align="center" justify="center">
        <Dots />
      </Box>
    )

  return (
    <Box fill width={{ max: "large" }}>
      <Form
        onReset={_onCancel}
        onSubmit={_onSubmit}
        messages={{
          required: "This field is required.",
        }}
        value={formValues}
      >
        {Object.entries(initialFormData).map(([fieldName, fieldData], i) => {
          const fieldProps = {
            autoFocus:
              Object.entries(errorState).length &&
              Object.keys(errorState)[0] === fieldName
                ? true
                : i === 0
                ? true
                : false,
            tabindex: i,
            ...fieldData,
            label:
              !fieldData.required || true ? (
                <Trans>{fieldData.label}*</Trans>
              ) : (
                <Trans>{fieldData.label} (Optional)</Trans>
              ),
            value: formValues[fieldName],
            onChange: _onChange,
            error: getErrorMessage(errorState[fieldName]),
            key: `formfactory-${fieldData.name}-${i}`,
            disabled: isSubmitted,
          }
          console.log(fieldData.isHiddenField)
          if (fieldData.isHiddenField(formValues) || fieldData.isExcluded)
            return null

          switch (fieldData.type) {
            case "boolean":
              return <CheckBox checked={true} label="interested?" />
            //Checkbox input
            case "date":
              //Text input
              return <DateInput {...fieldProps} />
            // case "field":
            //   return <Select {...fieldProps} />
            //Select input
            default:
              if (fieldData.choices) {
                return fieldData.choices.length < 4 ? (
                  <Radio {...fieldProps} />
                ) : (
                  <Select {...fieldProps} />
                )
              } else {
                if (fieldName.includes("email"))
                  return <EmailInput {...fieldProps} />

                if (fieldName.includes("password"))
                  return <PasswordInput {...fieldProps} />

                if (fieldName.includes("contact"))
                  return <PhoneInput {...fieldProps} />

                return <Input {...fieldProps} />
              }
          }
        })}
        <Box align="center" justify="center">
          <Text size="small">
            {errorState.non_field_errors && (
              <Text size="small" color="status-critical">
                {errorState.non_field_errors[0]}
              </Text>
            )}
          </Text>
        </Box>
        <Box align="center">
          <Box
            width={{ max: "medium" }}
            direction="row"
            gap="medium"
            justify="evenly"
            margin={{ top: "medium" }}
          >
            <Button
              type="reset"
              disabled={isSubmitted}
              label={<Trans>Cancel</Trans>}
            />
            <Button
              type="submit"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }}
              primary
              disabled={isSubmitted}
              label={
                isSubmitted ? (
                  <Box fill width={{ min: "48px" }}>
                    <Dots.Plain
                      circlesColor="rgb(255, 255, 255)"
                      circlesRadius="4"
                    />
                  </Box>
                ) : (
                  <Trans>Submit</Trans>
                )
              }
            />
          </Box>
        </Box>
      </Form>
    </Box>
  )
}

FormFactory.propTypes = {
  formService: PropTypes.object.isRequired,
}

const FormFactoryWithOptions = ({ formService, ...props }) => {
  if (!formService || !formService.options) {
    return (
      <Box fill align="center" justify="center">
        <Dots />
      </Box>
    )
  }

  return <FormFactory formService={formService} {...props} />
}

export default FormFactoryWithOptions
