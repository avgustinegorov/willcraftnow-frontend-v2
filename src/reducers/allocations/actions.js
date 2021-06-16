import { createAction } from "redux-actions"

export const ALLOCATION_OPTIONS = "ALLOCATION_OPTIONS"
export const addAllocationOptions = createAction(
  ALLOCATION_OPTIONS,
  ({ orderId, assetId }) => ({
    key: `ALLOCATION`,
    orderId: orderId,
    assetId: assetId,
  })
)

export const ADD_ALLOCATION_FORM = "ADD_ALLOCATION_FORM"
export const SUCCESS_ADD_ALLOCATION_FORM = "SUCCESS_ADD_ALLOCATION_FORM"
export const FAILURE_ADD_ALLOCATION_FORM = "FAILURE_ADD_ALLOCATION_FORM"

export const addAllocation = createAction(ADD_ALLOCATION_FORM)
export const successAddAllocation = createAction(SUCCESS_ADD_ALLOCATION_FORM)
export const failureAddAllocation = createAction(FAILURE_ADD_ALLOCATION_FORM)

export const EDIT_ALLOCATION_FORM = "EDIT_ALLOCATION_FORM"
export const SUCCESS_EDIT_ALLOCATION_FORM = "SUCCESS_EDIT_ALLOCATION_FORM"
export const FAILURE_EDIT_ALLOCATION_FORM = "FAILURE_EDIT_ALLOCATION_FORM"

export const editAllocation = createAction(EDIT_ALLOCATION_FORM)
export const successEditAllocation = createAction(SUCCESS_EDIT_ALLOCATION_FORM)
export const failureEditAllocation = createAction(FAILURE_EDIT_ALLOCATION_FORM)

export const DELETE_ALLOCATION = "DELETE_ALLOCATION"
export const SUCCESS_DELETE_ALLOCATION = "SUCCESS_DELETE_ALLOCATION"
export const FAILURE_DELETE_ALLOCATION = "FAILURE_DELETE_ALLOCATION"

export const deleteAllocation = createAction(DELETE_ALLOCATION)
export const successDeleteAllocation = createAction(SUCCESS_DELETE_ALLOCATION)
export const failureDeleteAllocation = createAction(FAILURE_DELETE_ALLOCATION)
