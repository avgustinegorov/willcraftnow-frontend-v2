import update from "immutability-helper"

import {
  SUCCESS_EDIT_USER_FORM,
  SUCCESS_GET_USER,
  SUCCESS_IS_USER_FORM,
  SUCCESS_REGISTER_USER_FORM,
  SUCCESS_LOGIN_USER_FORM,
  CANCEL_REGISTER_LOGIN_USER_FORM,
  SUCCESS_LOGOUT_USER,
} from "./actions"

export default function userReducer(
  state = {
    data: {},
    auth: {
      email: null,
      status: null,
      authFormState: 0,
      token: null,
      refreshToken: null,
      tokenExpiry: null,
      resetPassword: false,
    },
    isLoaded: false,
  },
  { type, payload = {} }
) {
  const { userId } = payload
  const today = new Date()

  /**
   * Given the same arguments, it should calculate the next state and return it.
   * No surprises. No side effects. No API calls. No mutations. Just a calculation.
   */
  switch (type) {
    case SUCCESS_GET_USER:
      return update(state, {
        data: {
          $merge: payload.data,
        },
        isLoaded: { $set: true },
      })
    case SUCCESS_EDIT_USER_FORM:
      return update(state, {
        data: {
          $merge: payload.data,
        },
      })
    case SUCCESS_IS_USER_FORM:
      return update(state, {
        auth: {
          email: {
            $set: payload.data.email,
          },
          authFormState: {
            $set: payload.data.authFormState,
          },
        },
      })
    case CANCEL_REGISTER_LOGIN_USER_FORM:
      return update(state, {
        auth: {
          authFormState: {
            $set: 0,
          },
        },
      })
    case SUCCESS_REGISTER_USER_FORM:
      return update(state, {
        auth: {
          token: {
            $set: payload.data.access_token,
          },
          tokenExpiry: {
            $set: today
              .setSeconds(today.getSeconds() + payload.data.expires_in)
              .valueOf(),
          },
          refreshToken: {
            $set: payload.data.refresh_token,
          },
        },
      })
    case SUCCESS_LOGIN_USER_FORM:
      return update(state, {
        auth: {
          token: {
            $set: payload.data.access_token,
          },
          tokenExpiry: {
            $set: today
              .setSeconds(today.getSeconds() + payload.data.expires_in)
              .valueOf(),
          },
          refreshToken: {
            $set: payload.data.refresh_token,
          },
        },
      })
    case SUCCESS_LOGOUT_USER:
      return update(state, {
        auth: {
          token: {
            $set: null,
          },
          tokenExpiry: {
            $set: null,
          },
          refreshToken: {
            $set: null,
          },
          email: {
            $set: null,
          },
          authFormState: {
            $set: 0,
          },
        },
      })
    default:
      return state
  }
}
