import update from "immutability-helper"

import {
  SUCCESS_ADD_ALLOCATION_FORM,
  SUCCESS_DELETE_ALLOCATION,
  SUCCESS_EDIT_ALLOCATION_FORM,
} from "./actions"

export default function reducer(state = [], { type, payload = {} }) {
  const { allocationId } = payload
  const index = state.findIndex(
    allocation => parseInt(allocation.id) === parseInt(allocationId)
  )
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_ALLOCATION_FORM:
      return update(state, {
        $push: [payload.data],
      })
    case SUCCESS_EDIT_ALLOCATION_FORM:
      return update(state, {
        [index]: {
          $merge: payload.data,
        },
      })
    case SUCCESS_DELETE_ALLOCATION:
      return update(state, { $splice: [[index, 1]] })
    default:
      return undefined
  }
}
