import update from "immutability-helper"

import { ON_LOADER, OFF_LOADER } from "./actions"

export default function loaderReducer(state = {}, { type, payload = {} }) {
  const { key } = payload
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case ON_LOADER:
      return update(state, {
        [key]: { $set: true },
      })
    case OFF_LOADER:
      return update(state, {
        [key]: { $set: false },
      })
    default:
      return state
  }
}
