import update from "immutability-helper"

import {
  SUCCESS_ADD_LEGAL_SERVICE_FORM,
  SUCCESS_DELETE_LEGAL_SERVICE,
} from "./actions"

export default function dataReducer(state = [], { type, payload = {} }) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_LEGAL_SERVICE_FORM:
      return update(state, {
        $push: [payload.data],
      })
    case SUCCESS_DELETE_LEGAL_SERVICE:
      const index = state.find(
        service => service.service_type === payload.legalService
      )
      return update(state, { $splice: [[index, 1]] })
    default:
      return undefined
  }
}
