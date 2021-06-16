import { createAction } from "redux-actions"

export const FETCH_FIRMS = "FETCH_FIRMS"
export const SUCCESS_FETCH_FIRMS = "SUCCESS_FETCH_FIRMS"
export const FAILURE_FETCH_FIRMS = "FAILURE_FETCH_FIRMS"

export const fetchFirms = createAction(FETCH_FIRMS)
export const successFetchFirms = createAction(SUCCESS_FETCH_FIRMS)
export const failureFetchFirms = createAction(FAILURE_FETCH_FIRMS)
