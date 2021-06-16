import { createAction } from "redux-actions"

export const LEGAL_SERVICE_OPTIONS = "LEGAL_SERVICE_OPTIONS"
export const legalServicesOptions = createAction(LEGAL_SERVICE_OPTIONS)

export const ADD_LEGAL_SERVICE_FORM = "ADD_LEGAL_SERVICE_FORM"
export const SUCCESS_ADD_LEGAL_SERVICE_FORM = "SUCCESS_ADD_LEGAL_SERVICE_FORM"
export const FAILURE_ADD_LEGAL_SERVICE_FORM = "FAILURE_ADD_LEGAL_SERVICE_FORM"

export const addLegalService = createAction(ADD_LEGAL_SERVICE_FORM)
export const successAddLegalService = createAction(
  SUCCESS_ADD_LEGAL_SERVICE_FORM
)
export const failureAddLegalService = createAction(
  FAILURE_ADD_LEGAL_SERVICE_FORM
)

export const DELETE_LEGAL_SERVICE = "DELETE_LEGAL_SERVICE"
export const SUCCESS_DELETE_LEGAL_SERVICE = "SUCCESS_DELETE_LEGAL_SERVICE"
export const FAILURE_DELETE_LEGAL_SERVICE = "FAILURE_DELETE_LEGAL_SERVICE"

export const deleteLegalService = createAction(DELETE_LEGAL_SERVICE)
export const successDeleteLegalService = createAction(
  SUCCESS_DELETE_LEGAL_SERVICE
)
export const failureDeleteLegalService = createAction(
  FAILURE_DELETE_LEGAL_SERVICE
)
