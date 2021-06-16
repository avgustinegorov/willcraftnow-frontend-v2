import { createAction } from "redux-actions"

export const ON_LOADER = "ON_LOADER"

export const onLoader = createAction(ON_LOADER)

export const OFF_LOADER = "OFF_LOADER"

export const offLoader = createAction(OFF_LOADER)
