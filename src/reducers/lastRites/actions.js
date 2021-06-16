import { createAction } from "redux-actions"

export const LAST_RITES_OPTIONS = "LAST_RITES_OPTIONS"
export const lastRitesOptions = createAction(
  LAST_RITES_OPTIONS,
  ({ orderId }) => ({
    key: `LAST_RITES`,
    orderId: orderId,
  })
)

export const ADD_LAST_RITES_FORM = "ADD_LAST_RITES_FORM"
export const SUCCESS_ADD_LAST_RITES_FORM = "SUCCESS_ADD_LAST_RITES_FORM"
export const FAILURE_ADD_LAST_RITES_FORM = "FAILURE_ADD_LAST_RITES_FORM"

export const addLastRites = createAction(ADD_LAST_RITES_FORM)
export const successAddLastRites = createAction(SUCCESS_ADD_LAST_RITES_FORM)
export const failureAddLastRites = createAction(FAILURE_ADD_LAST_RITES_FORM)

export const DELETE_LAST_RITES = "DELETE_LAST_RITES"
export const SUCCESS_DELETE_LAST_RITES = "SUCCESS_DELETE_LAST_RITES"
export const FAILURE_DELETE_LAST_RITES = "FAILURE_DELETE_LAST_RITES"

export const deleteLastRites = createAction(DELETE_LAST_RITES)
export const successDeleteLastRites = createAction(SUCCESS_DELETE_LAST_RITES)
export const failureDeleteLastRites = createAction(FAILURE_DELETE_LAST_RITES)
