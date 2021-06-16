import {
  isDecimal,
  isEmail,
  isNRIC,
  isPostalCode,
  isInteger,
  isNumber,
} from "./utils"
import { isNotEmpty } from "../utils"

export const requiredValidation = (fieldValue, formValues) => {
  return (
    !isNotEmpty(fieldValue) && {
      status: "error",
      message: "This field is required.",
    }
  )
}

export const nameValidations = {
  id_number: (fieldValue, formValues) => {
    return (
      formValues &&
      ["NRIC", "FIN"].includes(formValues.id_document) &&
      !isNRIC(fieldValue) && {
        status: "error",
        message: "Please provide a valid NRIC/FIN number.",
      }
    )
  },
  postal_code: (fieldValue, formValues) => {
    return (
      formValues &&
      formValues.country === "SG" &&
      !isPostalCode(fieldValue) && {
        status: "error",
        message: "Please provide a valid postal code.",
      }
    )
  },
  floor_number: (fieldValue, formValues) => {
    return fieldValue > 99 && `Please enter a two digit number.`
  },
  unit_number: (fieldValue, formValues) => {
    return fieldValue > 9999 && `Please enter a four digit number.`
  },
}

export const typeValidations = {
  decimal: [
    (fieldValue, formValues) => {
      return (
        fieldValue &&
        !isDecimal(fieldValue) && {
          status: "error",
          message: "Please provide a decimal.",
        }
      )
    },
    (fieldValue, formValues) => {
      return (
        fieldValue &&
        fieldValue < 0 && {
          status: "error",
          message: "Please provide a positive decimal.",
        }
      )
    },
  ],
  number: [
    (fieldValue, formValues) => {
      return (
        fieldValue &&
        !isNumber(fieldValue) && {
          status: "error",
          message: "Please provide a number.",
        }
      )
    },
    (fieldValue, formValues) => {
      return (
        fieldValue &&
        fieldValue < 0 && {
          status: "error",
          message: "Please provide a positive number.",
        }
      )
    },
  ],
  integer: [
    (fieldValue, formValues) => {
      return (
        fieldValue &&
        !isInteger(fieldValue) && {
          status: "error",
          message: "Please provide a whole number.",
        }
      )
    },
    (fieldValue, formValues) => {
      return (
        fieldValue &&
        fieldValue < 0 && {
          status: "error",
          message: "Please provide a positive whole number.",
        }
      )
    },
  ],
  email: (fieldValue, formValues) => {
    return (
      fieldValue &&
      !isEmail(fieldValue) && {
        status: "error",
        message: "Please provide a valid email.",
      }
    )
  },
}
