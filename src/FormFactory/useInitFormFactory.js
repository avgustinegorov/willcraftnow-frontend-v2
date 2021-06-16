import React from "react"
import { useDispatch } from "react-redux"
import { updateFormErrors } from "../reducers/forms/actions"
import { nameParsers, typeParsers } from "./parsers"
import { toCapitalCase } from "./utils"

import {
  nameValidations,
  requiredValidation,
  typeValidations,
} from "./validators/validators"

const modesMap = {
  add: "POST",
  edit: "PUT",
  options: "OPTIONS",
}

const cleanOptions = ({ options, excludedFields }) => {
  const temp = Object.entries(options).filter(
    ([fieldKey, fieldData]) =>
      fieldData.display &&
      !fieldData.read_only &&
      !excludedFields.includes(fieldKey)
  )
  return Object.fromEntries(temp)
}

const cleanFieldOptions = ({
  options,
  initialFieldOptions = {},
  excludedFields,
}) => {
  const temp = Object.entries(initialFieldOptions).filter(
    ([fieldKey, fieldData]) =>
      fieldKey in options && !excludedFields.includes(fieldKey)
  )
  return Object.fromEntries(temp)
}

const cleanFieldData = ({ options, initialData = {}, excludedFields }) => {
  const temp = Object.entries(initialData).filter(
    ([fieldKey, fieldData]) =>
      fieldKey in options && !excludedFields.includes(fieldKey)
  )

  return Object.fromEntries(temp)
}

const getCleanOptions = ({
  initalOptions,
  mode,
  initialFieldOptions,
  initialData,
  excludedFields,
}) => {
  let options = {}

  if (initalOptions && initalOptions.methods) {
    let _method = modesMap[mode]
    if (!_method || !initalOptions.methods.includes(_method.toUpperCase())) {
      _method = initalOptions.methods[0]
    }
    options = cleanOptions({ options: initalOptions[_method], excludedFields })
  }

  return {
    options,
    fieldOptions: cleanFieldOptions({
      options,
      initialFieldOptions,
      excludedFields,
    }),
    data: cleanFieldData({ options, initialData, excludedFields }),
  }
}

const assignChoicesAndCategory = ({
  options,
  fieldKey,
  fieldOptions: { choices = [], category, ...restFieldOptions },
}) => {
  Object.assign(options, restFieldOptions)
  options[fieldKey].category = toCapitalCase(category)
  options[fieldKey].choices = options[fieldKey].choices
    ? options[fieldKey].choices.concat(...choices)
    : choices
}

export const useInitFormFactory = ({
  options: initalOptions = {},
  mode = "add",
  fieldOptions: initialFieldOptions = {},
  data: initialData = {},
  excludedFields = [],
}) => {
  const dispatch = useDispatch()
  const [init, setInit] = React.useState({
    choices: false,
    validators: false,
    parsers: false,
    data: false,
    hidden: false,
  })

  const { options, fieldOptions, data } = React.useCallback(
    getCleanOptions({
      initalOptions,
      mode,
      initialFieldOptions,
      initialData,
      excludedFields,
    }),
    [initalOptions, initialFieldOptions, mode, initialData]
  )

  React.useEffect(() => {
    // // assigning labels and name
    Object.entries(options).forEach(([fieldKey, fieldOptions]) => {
      fieldOptions.name = fieldKey
    })
    setInit(state => ({ ...state, labels: true }))
    // // assigning choices and categories
    Object.entries(fieldOptions)
      .filter(
        ([addFieldKey, addFieldOptions]) =>
          addFieldKey in options && options[addFieldKey].isPK
      )
      .forEach(([addFieldKey, addFieldOptions]) => {
        const fieldOptionsArray = Array.isArray(addFieldOptions)
          ? addFieldOptions
          : [addFieldOptions]
        options[addFieldKey].choices = []

        fieldOptionsArray.forEach(fieldOptions =>
          assignChoicesAndCategory({
            options,
            fieldKey: addFieldKey,
            fieldOptions: fieldOptions,
          })
        )
      })
    setInit(state => ({ ...state, choices: true }))
    // //   assigning validators
    Object.entries(options).forEach(([fieldKey, fieldOptions]) => {
      const validators = fieldOptions.validators
        ? fieldOptions.validators.filter(e => !!e)
        : []

      if (fieldOptions.required) {
        validators.push(requiredValidation)
      }
      if (fieldKey in nameValidations) {
        Array.isArray(nameValidations[fieldKey])
          ? validators.push(...nameValidations[fieldKey])
          : validators.push(nameValidations[fieldKey])
      }

      const fieldType = fieldOptions.type
      if (fieldType in typeValidations) {
        Array.isArray(typeValidations[fieldType])
          ? validators.push(...typeValidations[fieldType])
          : validators.push(typeValidations[fieldType])
      }

      fieldOptions.validators = validators

      fieldOptions.validate = (value, allValues) => {
        return validators.reduce((acc, validator, i) => {
          const error = validator(value, allValues)
          if (error) {
            acc.push(error)
          }
          return acc
        }, [])
      }
    })

    setInit(state => ({ ...state, validators: true }))
    // //   assigning parsers -- > not really used
    Object.entries(options).forEach(([fieldKey, fieldOptions]) => {
      const parsers = []

      if (fieldKey in nameParsers) {
        Array.isArray(nameParsers[fieldKey])
          ? parsers.push(...nameParsers[fieldKey])
          : parsers.push(nameParsers[fieldKey])
      }

      const fieldType = fieldOptions.type
      if (fieldType in typeParsers) {
        Array.isArray(typeValidations[fieldType])
          ? parsers.push(...typeValidations[fieldType])
          : parsers.push(typeValidations[fieldType])
      }

      fieldOptions.parsers = parsers
    })
    setInit(state => ({ ...state, parsers: true }))
    //   assign alerts
    Object.entries(options).forEach(([fieldName, fieldData]) => {
      options[fieldName].alert =
        fieldOptions[fieldName] && "alert" in fieldOptions[fieldName]
          ? (value, allValues) =>
              !fieldOptions[fieldName].alert(value, allValues)
          : () => null
    })
    setInit(state => ({ ...state, alerts: true }))
    // //   assign hidden field
    Object.entries(options).forEach(([fieldName, fieldData]) => {
      options[fieldName].isHiddenField =
        fieldOptions[fieldName] && "showOn" in fieldOptions[fieldName]
          ? values => !fieldOptions[fieldName].showOn(values)
          : () => false
    })
    setInit(state => ({ ...state, hidden: true }))
    // //   assign excluded field
    Object.entries(options).forEach(([fieldName, fieldData]) => {
      options[fieldName].isExcluded = excludedFields.includes(fieldName)
        ? true
        : false
    })
    setInit(state => ({ ...state, excluded: true }))
    // //   assign additionalProps
    Object.entries(options).forEach(([fieldName, fieldData]) => {
      options[fieldName].addProps = fieldOptions[fieldName] || {}
    })
    setInit(state => ({ ...state, addProps: true }))
  }, [initalOptions])

  // //   assigning data
  React.useEffect(() => {
    Object.entries(options)
      .filter(([fieldKey, fieldOptions]) => fieldKey in initalOptions)
      .forEach(([fieldKey, fieldOptions]) => {
        const isChoiceField = !!options.choices
        const value = initialData[fieldKey]
          ? initialData[fieldKey]
          : isChoiceField
          ? null
          : ""

        data[fieldKey] = options[fieldKey].value = value
      })
    setInit(state => ({ ...state, data: true }))
  }, [initalOptions, !initialData])

  const validateFormValues = React.useCallback(
    formValues => {
      const errors = Object.entries(options).reduce(
        (acc, [fieldName, fieldData], i) => {
          if (fieldData.required && !excludedFields.includes(fieldData)) {
            const errors = fieldData.validate(formValues[fieldName], formValues)
            if (errors) {
              acc[fieldName] = errors
            }
          }
          return acc
        },
        {}
      )

      const isValid = !Object.values(errors).some(errorArray =>
        Array.isArray(errorArray) ? errorArray.length : !!errorArray
      )

      if (!isValid) {
        dispatch(updateFormErrors({ data: errors }))
      }

      return { errors, isValid }
    },
    [initalOptions, excludedFields]
  )

  console.log("INTIAL", { ...options }, options)
  return {
    initialFormData: options,
    initialFormValues: data,
    validateFormValues,
    isLoading: Object.values(options).some(option => {
      return (
        !init.parsers ||
        !init.labels ||
        !init.addProps ||
        !init.alerts ||
        !init.excluded ||
        !init.validators ||
        !init.parsers ||
        !init.data ||
        !init.hidden
      )
    }),
  }
}
