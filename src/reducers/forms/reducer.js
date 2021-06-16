import update from "immutability-helper"

import {
  ADD_FORMSTATE,
  DELETE_FORMSTATE,
  UPDATE_FORMSTATE,
  RESET_FORMSTATE,
  UPDATE_FORMSTATE_ERRORS,
  UPDATE_FORMSTATE_LOADING,
  UPDATE_FORMSTATE_NOT_LOADING,
} from "./actions"

export default function formReducer(
  state = { data: [], error: false },
  { type, payload }
) {
  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */

  const lastIndex = state.data.length - 1

  switch (type) {
    case ADD_FORMSTATE:
      return update(state, {
        data: {
          $push: [
            {
              category: payload.category,
              successPathname: payload.pathname,
              action: payload.action,
              data: payload.data,
              isLoading: false,
              isSubmitted: false,
              errors: {},
            },
          ],
        },
      })
    case UPDATE_FORMSTATE:
      if (lastIndex < 0) return state
      return update(state, {
        data: {
          [lastIndex]: {
            data: { $set: payload.data },
          },
        },
      })
    case UPDATE_FORMSTATE_ERRORS:
      if (lastIndex < 0) return state
      return update(state, {
        data: {
          [lastIndex]: {
            errors: {
              $set: {
                non_field_errors: null,
                ...payload.data,
              },
            },
            isLoading: { $set: false },
            isSubmitted: { $set: false },
          },
        },
      })
    case UPDATE_FORMSTATE_LOADING:
      if (lastIndex < 0) return state
      return update(state, {
        data: {
          [lastIndex]: {
            isSubmitted: { $set: true },
          },
        },
      })
    case UPDATE_FORMSTATE_NOT_LOADING:
      if (lastIndex < 0) return state
      return update(state, {
        data: {
          [lastIndex]: {
            isSubmitted: { $set: false },
          },
        },
      })
    case DELETE_FORMSTATE:
      return update(state, {
        data: { $splice: [[payload.formIndex, 1]] },
      })
    case RESET_FORMSTATE:
      return update(state, {
        data: {
          $set: [],
        },
      })
    default:
      return state
  }
}
