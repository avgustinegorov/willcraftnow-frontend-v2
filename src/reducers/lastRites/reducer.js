import update from "immutability-helper"

import {
  SUCCESS_ADD_LAST_RITES_FORM,
  SUCCESS_DELETE_LAST_RITES,
} from "./actions"

export default function lastRitesReducer(state = null, { type, payload = {} }) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_LAST_RITES_FORM:
      return update(state, {
        $set: payload.data,
      })
    case SUCCESS_DELETE_LAST_RITES:
      return update(state, {
        $set: null,
      })
    default:
      return undefined
  }
}
