import update from "immutability-helper"

import { SUCCESS_FETCH_FIRMS } from "./actions"

export default function dataReducer(
  state = { data: [], isLoaded: false },
  { type, payload = {} }
) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_FETCH_FIRMS:
      return update(state, {
        data: {
          $merge: payload.data,
        },
        isLoaded: { $set: true },
      })

    default:
      return state
  }
}
