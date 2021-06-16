import { createAction } from "redux-actions"

export const USER_FORM_OPTIONS = "USER_FORM_OPTIONS"
export const userOptions = createAction(USER_FORM_OPTIONS, () => ({
  key: `USER`,
}))

export const GET_USER = "GET_USER"
export const SUCCESS_GET_USER = "SUCCESS_GET_USER"
export const FAILURE_GET_USER = "FAILURE_GET_USER"

export const getUser = createAction(GET_USER)
export const successGetUser = createAction(SUCCESS_GET_USER)
export const failureGetUser = createAction(FAILURE_GET_USER)

export const EDIT_USER_FORM = "EDIT_USER_FORM"
export const SUCCESS_EDIT_USER_FORM = "SUCCESS_EDIT_USER_FORM"
export const FAILURE_EDIT_USER_FORM = "FAILURE_EDIT_USER_FORM"

export const editUser = createAction(EDIT_USER_FORM)
export const successEditUser = createAction(SUCCESS_EDIT_USER_FORM)
export const failureEditUser = createAction(FAILURE_EDIT_USER_FORM)

export const REGISTER_USER_OPTIONS = "REGISTER_USER_OPTIONS"
export const registerUserOptions = createAction(REGISTER_USER_OPTIONS)

export const REGISTER_USER_FORM = "REGISTER_USER_FORM"
export const SUCCESS_REGISTER_USER_FORM = "SUCCESS_REGISTER_USER_FORM"
export const FAILURE_REGISTER_USER_FORM = "FAILURE_REGISTER_USER_FORM"

export const registerUser = createAction(REGISTER_USER_FORM)
export const successRegisterUser = createAction(SUCCESS_REGISTER_USER_FORM)
export const failureRegisterUser = createAction(FAILURE_REGISTER_USER_FORM)

export const LOGOUT_USER = "LOGOUT_USER"
export const logoutUser = createAction(LOGOUT_USER)

export const SUCCESS_LOGOUT_USER = "SUCCESS_LOGOUT_USER"
export const successLogoutUser = createAction(SUCCESS_LOGOUT_USER)

export const LOGIN_USER_OPTIONS = "LOGIN_USER_OPTIONS"
export const loginUserOptions = createAction(LOGIN_USER_OPTIONS)

export const LOGIN_USER_FORM = "LOGIN_USER_FORM"
export const SUCCESS_LOGIN_USER_FORM = "SUCCESS_LOGIN_USER_FORM"
export const FAILURE_LOGIN_USER_FORM = "FAILURE_LOGIN_USER_FORM"

export const loginUser = createAction(LOGIN_USER_FORM)
export const successLoginUser = createAction(SUCCESS_LOGIN_USER_FORM)
export const failureLoginUser = createAction(FAILURE_LOGIN_USER_FORM)

export const IS_USER_OPTIONS = "IS_USER_OPTIONS"
export const isUserOptions = createAction(IS_USER_OPTIONS)

export const IS_USER_FORM = "IS_USER_FORM"
export const SUCCESS_IS_USER_FORM = "SUCCESS_IS_USER_FORM"
export const FAILURE_IS_USER_FORM = "FAILURE_IS_USER_FORM"

export const IsUser = createAction(IS_USER_FORM)
export const successIsUser = createAction(SUCCESS_IS_USER_FORM)
export const failureIsUser = createAction(FAILURE_IS_USER_FORM)

export const FAILURE_RESET_PASSWORD_FORM = "FAILURE_RESET_PASSWORD_FORM"
export const failureResetPassword = createAction(FAILURE_RESET_PASSWORD_FORM)

export const TOKEN_REGISTER_USER_FORM = "TOKEN_REGISTER_USER_FORM"
export const tokenRegisterUser = createAction(TOKEN_REGISTER_USER_FORM)

export const RESET_PASSWORD_FORM = "RESET_PASSWORD_FORM"
export const resetPassword = createAction(RESET_PASSWORD_FORM)

export const CANCEL_REGISTER_LOGIN_USER_FORM = "CANCEL_REGISTER_LOGIN_USER_FORM"
export const cancelRegisterLogin = createAction(CANCEL_REGISTER_LOGIN_USER_FORM)

export const CONFIRM_PASSWORD_OPTIONS = "CONFIRM_PASSWORD_OPTIONS"
export const confirmPasswordOptions = createAction(
  CONFIRM_PASSWORD_OPTIONS,
  () => ({
    key: `CONFIRM_PASSWORD_FORM`,
  })
)

export const CONFIRM_PASSWORD_FORM = "CONFIRM_PASSWORD_FORM"
export const SUCCESS_CONFIRM_PASSWORD_FORM = "SUCCESS_CONFIRM_PASSWORD_FORM"
export const FAILURE_CONFIRM_PASSWORD_FORM = "FAILURE_CONFIRM_PASSWORD_FORM"

export const confirmPassword = createAction(CONFIRM_PASSWORD_FORM)
export const successConfirmPassword = createAction(
  SUCCESS_CONFIRM_PASSWORD_FORM
)
export const failureConfirmPassword = createAction(
  FAILURE_CONFIRM_PASSWORD_FORM
)
