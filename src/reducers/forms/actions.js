import { createAction } from "redux-actions"

export const ADD_FORMSTATE = "ADD_FORMSTATE"
export const addForm = createAction(ADD_FORMSTATE)

export const DELETE_FORMSTATE = "DELETE_FORMSTATE"
export const deleteForm = createAction(DELETE_FORMSTATE)

export const UPDATE_FORMSTATE = "UPDATE_FORMSTATE"
export const updateForm = createAction(UPDATE_FORMSTATE)

export const UPDATE_FORMSTATE_ERRORS = "UPDATE_FORMSTATE_ERRORS"
export const updateFormErrors = createAction(UPDATE_FORMSTATE_ERRORS)

export const UPDATE_FORMSTATE_LOADING = "UPDATE_FORMSTATE_LOADING"
export const updateFormLoading = createAction(UPDATE_FORMSTATE_LOADING)

export const UPDATE_FORMSTATE_NOT_LOADING = "UPDATE_FORMSTATE_NOT_LOADING"
export const updateFormNotLoading = createAction(UPDATE_FORMSTATE_NOT_LOADING)

export const RESET_FORMSTATE = "RESET_FORMSTATE"
export const resetForm = createAction(RESET_FORMSTATE)

export const CANCEL_FORMSTATE = "CANCEL_FORMSTATE"
export const cancelForm = createAction(CANCEL_FORMSTATE)

export const RESOLVE_FORMSTATE = "RESOLVE_FORMSTATE"
export const resolveForm = createAction(RESOLVE_FORMSTATE)

export const RESOLVE_DELETE_FORMSTATE = "RESOLVE_DELETE_FORMSTATE"
export const resolveDeleteForm = createAction(RESOLVE_DELETE_FORMSTATE)

export const CONTINUE_FORMSTATE = "CONTINUE_FORMSTATE"
export const continueForm = createAction(CONTINUE_FORMSTATE)

export const REDIRECT_FORMSTATE = "REDIRECT_FORMSTATE"
export const redirectForm = createAction(REDIRECT_FORMSTATE)
