import { createAction } from "redux-actions"

export const ADD_OPTION = "ADD_OPTION"
export const SUCCESS_ADD_OPTION = "SUCCESS_ADD_OPTION"
export const FAILURE_ADD_OPTION = "FAILURE_ADD_OPTION"

export const addOption = createAction(ADD_OPTION)
export const successAddOption = createAction(SUCCESS_ADD_OPTION)
export const failureAddOption = createAction(FAILURE_ADD_OPTION)
