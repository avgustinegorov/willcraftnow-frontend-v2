import { createAction } from "redux-actions"

export const CLEAN_ORDER = "CLEAN_ORDER"
export const cleanAllOrders = createAction(CLEAN_ORDER)

export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER"
export const setCurrentOrder = createAction(SET_CURRENT_ORDER)

export const CLEAR_CURRENT_ORDER = "CLEAR_CURRENT_ORDER"
export const clearCurrentOrder = createAction(CLEAR_CURRENT_ORDER)

export const FETCH_ORDERS = "FETCH_ORDERS"
export const SUCCESS_FETCH_ORDERS = "SUCCESS_FETCH_ORDERS"
export const FAILURE_FETCH_ORDERS = "FAILURE_FETCH_ORDERS"

export const fetchOrders = createAction(FETCH_ORDERS)
export const successFetchOrders = createAction(SUCCESS_FETCH_ORDERS)
export const failureFetchOrders = createAction(FAILURE_FETCH_ORDERS)

export const GET_ORDER = "GET_ORDER"
export const SUCCESS_GET_ORDER = "SUCCESS_GET_ORDER"
export const FAILURE_GET_ORDER = "FAILURE_GET_ORDER"

export const getOrder = createAction(GET_ORDER)
export const successGetOrder = createAction(SUCCESS_GET_ORDER)
export const failureGetOrder = createAction(FAILURE_GET_ORDER)

export const ADD_ORDER = "ADD_ORDER"
export const SUCCESS_ADD_ORDER = "SUCCESS_ADD_ORDER"
export const FAILURE_ADD_ORDER = "FAILURE_ADD_ORDER"

export const addOrder = createAction(ADD_ORDER)
export const successAddOrder = createAction(SUCCESS_ADD_ORDER)
export const failureAddOrder = createAction(FAILURE_ADD_ORDER)

export const EDIT_ORDER = "EDIT_ORDER"
export const SUCCESS_EDIT_ORDER = "SUCCESS_EDIT_ORDER"
export const FAILURE_EDIT_ORDER = "FAILURE_EDIT_ORDER"

export const editOrder = createAction(EDIT_ORDER)
export const successEditOrder = createAction(SUCCESS_EDIT_ORDER)
export const failureEditOrder = createAction(FAILURE_EDIT_ORDER)

export const DELETE_ORDER = "DELETE_ORDER"
export const SUCCESS_DELETE_ORDER = "SUCCESS_DELETE_ORDER"
export const FAILURE_DELETE_ORDER = "FAILURE_DELETE_ORDER"

export const deleteOrder = createAction(DELETE_ORDER)
export const successDeleteOrder = createAction(SUCCESS_DELETE_ORDER)
export const failureDeleteOrder = createAction(FAILURE_DELETE_ORDER)
