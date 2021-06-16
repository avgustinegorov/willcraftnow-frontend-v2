import update from "immutability-helper"

import {
  SUCCESS_ADD_INSTRUCTIONS_FORM,
  SUCCESS_DELETE_INSTRUCTIONS,
} from "./actions"

export default function instructionsReducer(
  state = null,
  { type, payload = {} }
) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_INSTRUCTIONS_FORM:
      return update(state, {
        $set: payload.data,
      })
    case SUCCESS_DELETE_INSTRUCTIONS:
      return update(state, {
        $set: null,
      })
    default:
      return undefined
  }
}
