import { createAction } from "redux-actions"

export const FIRE_FORM_MODAL = "FIRE_FORM_MODAL"
export const fireFormModal = createAction(FIRE_FORM_MODAL)

export const CLOSE_FORM_MODAL = "CLOSE_FORM_MODAL"
export const closeFormModal = createAction(CLOSE_FORM_MODAL)
