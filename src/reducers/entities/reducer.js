import update from "immutability-helper"

import {
  SUCCESS_ADD_ENTITY_FORM,
  SUCCESS_DELETE_ENTITY,
  SUCCESS_EDIT_ENTITY_FORM,
  SUCCESS_FETCH_ENTITYS,
} from "./actions"

export default function entitiesReducer(
  state = { data: [], isLoaded: false },
  { type, payload = {} }
) {
  const { orderId, personId } = payload
  const index = state.data.findIndex(
    entity => parseInt(entity.id) === parseInt(personId)
  )
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_FETCH_ENTITYS:
      return update(state, {
        data: {
          $merge: payload.data,
        },
        isLoaded: { $set: true },
      })
    case SUCCESS_ADD_ENTITY_FORM:
      return update(state, {
        data: {
          $push: [payload.data],
        },
      })
    case SUCCESS_EDIT_ENTITY_FORM:
      return update(state, {
        data: { [index]: { $merge: payload.data } },
      })
    case SUCCESS_DELETE_ENTITY:
      return update(state, {
        data: { $splice: [[index, 1]] },
      })
    default:
      return state
  }
}
