import update from "immutability-helper"

import { SUCCESS_ADD_OPTION } from "./actions"

export default function optionsReducer(
  state = {
    PERSONONLY: {
      POST: {
        person: {
          type: "field",
          required: false,
          read_only: false,
          label: "Person",
          isPK: true,
          display: true,
        },
      },
      methods: ["POST"],
    },
  },
  { type, payload = {} }
) {
  const { key, options } = payload
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_OPTION:
      return update(state, {
        [key]: {
          $set: { ...options, methods: Object.keys(options) },
        },
      })
    default:
      return state
  }
}
