import { createAction } from "redux-actions"

export const INSTRUCTIONS_OPTIONS = "INSTRUCTIONS_OPTIONS"
export const instructionsOptions = createAction(
  INSTRUCTIONS_OPTIONS,
  ({ orderId }) => ({
    key: `INSTRUCTIONs`,
    orderId: orderId,
  })
)

export const ADD_INSTRUCTIONS_FORM = "ADD_INSTRUCTIONS_FORM"
export const SUCCESS_ADD_INSTRUCTIONS_FORM = "SUCCESS_ADD_INSTRUCTIONS_FORM"
export const FAILURE_ADD_INSTRUCTIONS_FORM = "FAILURE_ADD_INSTRUCTIONS_FORM"

export const addInstructions = createAction(ADD_INSTRUCTIONS_FORM)
export const successAddInstructions = createAction(
  SUCCESS_ADD_INSTRUCTIONS_FORM
)
export const failureAddInstructions = createAction(
  FAILURE_ADD_INSTRUCTIONS_FORM
)

export const DELETE_INSTRUCTIONS = "DELETE_INSTRUCTIONS"
export const SUCCESS_DELETE_INSTRUCTIONS = "SUCCESS_DELETE_INSTRUCTIONS"
export const FAILURE_DELETE_INSTRUCTIONS = "FAILURE_DELETE_INSTRUCTIONS"

export const deleteInstructions = createAction(DELETE_INSTRUCTIONS)
export const successDeleteInstructions = createAction(
  SUCCESS_DELETE_INSTRUCTIONS
)
export const failureDeleteInstructions = createAction(
  FAILURE_DELETE_INSTRUCTIONS
)
