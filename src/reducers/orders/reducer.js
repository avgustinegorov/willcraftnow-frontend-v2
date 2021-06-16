import update from "immutability-helper"

import {
  SUCCESS_ADD_ORDER,
  SUCCESS_DELETE_ORDER,
  SUCCESS_EDIT_ORDER,
  SUCCESS_GET_ORDER,
  SUCCESS_FETCH_ORDERS,
  SET_CURRENT_ORDER,
  CLEAR_CURRENT_ORDER,
  CLEAN_ORDER,
} from "./actions"

import instructionsReducer from "../instructions/reducer"
import lastRitesReducer from "../lastRites/reducer"
import allocationsReducer from "../allocations/reducer"
import appointmentsReducer from "../appointments/reducer"
import legalServicesReducer from "../legalServices/reducer"
import invoiceReducer from "../invoice/reducer"
import personalWelfareRestrictionsReducer from "../personalWelfareRestrictions/reducer"
import propertyAndAffairsReducer from "../PropertyAndAffairsRestrictions/reducer"

const getCleanOrders = ({ state, entityId, assetId }) => {}
export default function ordersReducer(
  state = { data: [], current: { order: null, type: null }, isLoaded: false },
  { type, payload = {} }
) {
  const { orderId, orderType } = payload

  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SET_CURRENT_ORDER:
      return update(state, {
        current: { order: { $set: orderId }, orderType: { $set: orderType } },
      })
    case CLEAR_CURRENT_ORDER:
      return update(state, {
        current: { order: { $set: null }, orderType: { $set: null } },
      })
    case SUCCESS_FETCH_ORDERS:
      return update(state, {
        data: {
          $merge: payload.data.map(i => ({ ...i, isLoaded: false })),
        },
        isLoaded: { $set: true },
      })
    case SUCCESS_GET_ORDER:
      const { id } = payload.data
      const orderIndex = state.data.findIndex(i => i.id === id)
      return update(state, {
        data: {
          [orderIndex]: {
            $merge: { ...payload.data, isLoaded: true },
          },
        },
      })
    case SUCCESS_ADD_ORDER:
      return update(state, {
        data: {
          $push: [{ ...payload.data, isLoaded: true }],
        },
      })
    case SUCCESS_EDIT_ORDER:
      return update(state, {
        $merge: payload.data,
      })
    case SUCCESS_DELETE_ORDER:
      return update(state, {
        data: { $unset: [orderId] },
      })
    case CLEAN_ORDER:
      console.log(getCleanOrders({ state, ...payload }))
      return state
    default:
      if (!orderId || !state.data.length) return state

      const index = state.data.findIndex(i => i.id === parseInt(orderId))

      const allocations = allocationsReducer(state.data[index].allocations, {
        type,
        payload,
      })

      if (allocations !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                allocations: allocations,
              },
            },
          },
        })
      }

      const persons = appointmentsReducer(state.data[index].persons, {
        type,
        payload,
      })

      if (persons !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                persons: persons,
              },
            },
          },
        })
      }

      const lastRites = lastRitesReducer(state.data[index].lastRites, {
        type,
        payload,
      })

      if (lastRites !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                last_rites: lastRites,
              },
            },
          },
        })
      }

      const instructions = instructionsReducer(state.data[index].instructions, {
        type,
        payload,
      })

      if (instructions !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                instructions: instructions,
              },
            },
          },
        })
      }

      const legalServices = legalServicesReducer(
        state.data[index].legal_services,
        {
          type,
          payload,
        }
      )

      if (legalServices !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                legal_services: legalServices,
              },
            },
          },
        })
      }

      const latestInvoice = invoiceReducer(state.data[index].latest_invoice, {
        type,
        payload,
      })

      if (latestInvoice !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                latest_invoice: latestInvoice,
              },
            },
          },
        })
      }

      const personalWelfareRestrictions = personalWelfareRestrictionsReducer(
        state.data[index].personal_welfare_restrictions,
        {
          type,
          payload,
        }
      )

      if (personalWelfareRestrictions !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                personal_welfare_restrictions: personalWelfareRestrictions,
              },
            },
          },
        })
      }

      const propertyAndAffairs = propertyAndAffairsReducer(
        state.data[index].property_and_affairs_restrictions,
        {
          type,
          payload,
        }
      )

      if (propertyAndAffairs !== undefined) {
        return update(state, {
          data: {
            [index]: {
              $merge: {
                property_and_affairs_restrictions: propertyAndAffairs,
              },
            },
          },
        })
      }

      return state
  }
}
