import update from "immutability-helper"

import {
  SUCCESS_ADD_ASSET_FORM,
  SUCCESS_DELETE_ASSET,
  SUCCESS_EDIT_ASSET_FORM,
  SUCCESS_FETCH_ASSETS,
} from "./actions"

export default function reducer(
  state = { data: [], isLoaded: false },
  { type, payload = {} }
) {
  const { orderId, assetId } = payload
  const index = state.data.findIndex(
    asset => parseInt(asset.id) === parseInt(assetId)
  )
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_FETCH_ASSETS:
      return update(state, {
        data: {
          $merge: payload.data,
        },
        isLoaded: { $set: true },
      })

    case SUCCESS_ADD_ASSET_FORM:
      return update(state, {
        data: {
          $push: [payload.data],
        },
      })
    case SUCCESS_EDIT_ASSET_FORM:
      return update(state, {
        data: { [index]: { $merge: payload.data } },
      })
    case SUCCESS_DELETE_ASSET:
      return update(state, {
        data: { $splice: [[index, 1]] },
      })
    default:
      return state
  }
}
