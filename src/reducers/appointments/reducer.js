import update from "immutability-helper"

import {
  DELETE_ORDER_ENTITY,
  ADD_ORDER_ENTITY,
  SUCCESS_ADD_APPOINTMENT_FORM,
  SUCCESS_DELETE_APPOINTMENT,
  SUCCESS_ADD_DONEE_POWERS_FORM,
  SUCCESS_DELETE_DONEE_POWERS,
} from "./actions"

export default function reducer(state = [], { type, payload = {} }) {
  const { orderId, person: personId, updated_type } = payload
  const index =
    state.findIndex(person => parseInt(person.entity) === parseInt(personId)) ||
    null

  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_ADD_APPOINTMENT_FORM:
      return index >= 0
        ? update(state, {
            [index]: { entity_roles: { $merge: [updated_type.toUpperCase()] } },
          })
        : update(state, {
            $push: [
              {
                donee_powers: null,
                entity: personId,
                entity_roles: [updated_type.toUpperCase()],
              },
            ],
          })
    case SUCCESS_DELETE_APPOINTMENT:
      const roleIndex = state
        .find(person => parseInt(person.entity) === parseInt(personId))
        .entity_roles.findIndex(role => role === updated_type.toUpperCase())
      return update(state, {
        [index]: { entity_roles: { $splice: [[roleIndex, 1]] } },
      })
    case SUCCESS_ADD_DONEE_POWERS_FORM:
      return index >= 0
        ? update(state, {
            [index]: {
              donee_powers: { $set: payload.data },
              entity_roles: { $merge: [updated_type.toUpperCase()] },
            },
          })
        : update(state, {
            $push: [
              {
                donee_powers: payload.data,
                entity: personId,
                entity_roles: [updated_type.toUpperCase()],
              },
            ],
          })
    case SUCCESS_DELETE_DONEE_POWERS:
      const doneeRoleIndex = state
        .find(person => parseInt(person.entity) === parseInt(personId))
        .entity_roles.findIndex(role => role === updated_type.toUpperCase())
      return update(state, {
        [index]: {
          donee_powers: { $set: null },
          entity_roles: { $splice: [[doneeRoleIndex, 1]] },
        },
      })
    case ADD_ORDER_ENTITY:
      return update(state, {
        $push: [
          {
            donee_powers: null,
            entity: personId,
            entity_roles: [],
          },
        ],
      })
    case DELETE_ORDER_ENTITY:
      return update(state, { $splice: [[index, 1]] })
    default:
      return undefined
  }
}
