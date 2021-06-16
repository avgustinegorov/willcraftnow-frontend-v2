import { createAction } from "redux-actions"

export const ADD_PAYMENT = "ADD_PAYMENT"
export const addPayment = createAction(ADD_PAYMENT)

export const ADD_DISCOUNT = "ADD_DISCOUNT"
export const FAILURE_ADD_DISCOUNT = "FAILURE_ADD_DISCOUNT"
export const SUCCESS_ADD_DISCOUNT = "SUCCESS_ADD_DISCOUNT"

export const addDiscount = createAction(ADD_DISCOUNT)
export const failureAddDiscount = createAction(FAILURE_ADD_DISCOUNT)
export const successAddDiscount = createAction(SUCCESS_ADD_DISCOUNT)

export const TOGGLE_DISCOUNT_SUBMITTED = "TOGGLE_DISCOUNT_SUBMITTED"
export const toggleDiscountSubmitted = createAction(TOGGLE_DISCOUNT_SUBMITTED)

export const GET_LATEST_INVOICE = "GET_LATEST_INVOICE"
export const SUCCESS_GET_LATEST_INVOICE = "SUCCESS_GET_LATEST_INVOICE"
export const FAILURE_GET_LATEST_INVOICE = "FAILURE_GET_LATEST_INVOICE"

export const getLatestInvoice = createAction(GET_LATEST_INVOICE)
export const successGetLatestInvoice = createAction(SUCCESS_GET_LATEST_INVOICE)
export const failureGetLatestInvoice = createAction(FAILURE_GET_LATEST_INVOICE)

export const CLEAR_LATEST_INVOICE = "CLEAR_LATEST_INVOICE"
export const SUCCESS_CLEAR_LATEST_INVOICE = "SUCCESS_CLEAR_LATEST_INVOICE"
export const FAILURE_CLEAR_LATEST_INVOICE = "FAILURE_CLEAR_LATEST_INVOICE"

export const clearLatestInvoice = createAction(CLEAR_LATEST_INVOICE)
export const successClearLatestInvoice = createAction(
  SUCCESS_CLEAR_LATEST_INVOICE
)
export const failureClearLatestInvoice = createAction(
  FAILURE_CLEAR_LATEST_INVOICE
)
