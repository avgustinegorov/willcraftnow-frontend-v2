import update from "immutability-helper"

import {
  SUCCESS_ADD_PROPERTY_AFFAIRS_RESTRICTIONS_FORM,
  SUCCESS_DELETE_PROPERTY_AFFAIRS_RESTRICTIONS,
} from "./actions"

export default function PropertyAffairsRestrictionsReducer(
  state = null,
  { type, payload = {} }
) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_PROPERTY_AFFAIRS_RESTRICTIONS_FORM:
      return update(state, {
        $set: payload.data,
      })
    case SUCCESS_DELETE_PROPERTY_AFFAIRS_RESTRICTIONS:
      return update(state, {
        $set: null,
      })
    default:
      return undefined
  }
}
