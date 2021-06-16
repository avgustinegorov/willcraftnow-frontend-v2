import update from "immutability-helper"

import {
  SUCCESS_GET_LATEST_INVOICE,
  TOGGLE_DISCOUNT_SUBMITTED,
  FAILURE_ADD_DISCOUNT,
} from "./actions"

export default function reducer(state = {}, { type, payload = {} }) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case FAILURE_ADD_DISCOUNT:
      return update(state, {
        $set: {
          ...state,
          discountStatus: {
            submitted: true,
            error: payload.e.data,
          },
        },
      })
    case SUCCESS_GET_LATEST_INVOICE:
      return update(state, {
        $set: { ...state, isLoaded: true, ...payload.data },
      })

    case TOGGLE_DISCOUNT_SUBMITTED:
      return update(state, {
        $set: {
          ...state,
          discountStatus: {
            ...(state.discountStatus || {}),
            submitted: state.discountStatus?.submitted
              ? !state.discountStatus.submitted
              : true,
          },
        },
      })

    default:
      return undefined
  }
}
