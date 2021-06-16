import update from "immutability-helper"

import { FIRE_FORM_MODAL, CLOSE_FORM_MODAL } from "./actions"
export default function formModalReducer(state = {}, { type, payload }) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case FIRE_FORM_MODAL:
      return update(state, {
        $set: payload,
      })
    case CLOSE_FORM_MODAL:
      return update(state, {
        $set: {},
      })
    default:
      return state
  }
}
