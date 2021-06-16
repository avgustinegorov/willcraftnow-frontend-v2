import { call, select, put, fork, takeLeading } from "redux-saga/effects"
import { request } from "../../utils/request"
import {
  EDIT_USER_FORM,
  GET_USER,
  USER_FORM_OPTIONS,
  REGISTER_USER_OPTIONS,
  LOGIN_USER_OPTIONS,
  IS_USER_OPTIONS,
  REGISTER_USER_FORM,
  LOGIN_USER_FORM,
  IS_USER_FORM,
  LOGOUT_USER,
  TOKEN_REGISTER_USER_FORM,
  successLogoutUser,
  failureEditUser,
  failureGetUser,
  successEditUser,
  successGetUser,
  successRegisterUser,
  failureRegisterUser,
  successLoginUser,
  failureLoginUser,
  successIsUser,
  failureIsUser,
  cancelRegisterLogin,
  failureResetPassword,
  RESET_PASSWORD_FORM,
  failureConfirmPassword,
  successConfirmPassword,
  CONFIRM_PASSWORD_FORM,
  CONFIRM_PASSWORD_OPTIONS,
  resetPassword,
} from "./actions"
import {
  editUserRoute,
  getUserRoute,
  registerUserRoute,
  loginUserRoute,
  isUserRoute,
  resetPasswordRoute,
  tokenRegisterUserRoute,
  confirmPasswordRoute,
} from "./routes"
import navigate from "../../utils/navigate"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { fireFormModal } from "../formModal/actions"
import { t } from "@lingui/macro"
import { resolveForm } from "../forms"
import { updateFormNotLoading } from "../forms/actions"
import { failureAddOption, successAddOption } from "../options/actions"

function* getUserSaga() {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({ url: getUserRoute.serverReverse(), token })
    )
    yield put(successGetUser({ data }))
  } catch (e) {
    yield put(failureGetUser({ e }))
  }
}

function* watchGetUserSaga() {
  yield takeLeading(GET_USER, getUserSaga)
}

function* userOptionsSaga({ payload }) {
  const { key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: editUserRoute.serverReverse(),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchUserOptionsSaga() {
  yield takeLeading(USER_FORM_OPTIONS, userOptionsSaga)
}

function* editUserSaga({ payload }) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: editUserRoute.serverReverse(),
        params: { ...payload.params, entity_type: "Person" },
        method: "POST",
        token,
      })
    )
    yield put(successEditUser({ data }))
    trackCustomEvent({
      category: "CompleteRegistration",
      action: "Success",
    })
    yield put(
      resolveForm({
        category: "USER_DETAILS",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureEditUser({ e }))
  }
}

function* watchEditUserSaga() {
  yield takeLeading(EDIT_USER_FORM, editUserSaga)
}

// **********************************************************
// **********************************************************
// Auth Sagas
// **********************************************************
// **********************************************************

function* registerUserOptionsSaga({ payload }) {
  const { key } = payload
  try {
    const { data } = yield call(() =>
      request({
        url: registerUserRoute.serverReverse(),
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchRegisterUserOptionsSaga() {
  yield takeLeading(REGISTER_USER_OPTIONS, registerUserOptionsSaga)
}

function* resetPasswordSaga({ payload }) {
  try {
    const { client_id } = yield select(state => state.config)
    const { email } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: resetPasswordRoute.serverReverse(),
        method: "POST",
        params: {
          email: payload.email || email,
          domain: window.location.hostname,
        },
      })
    )
    yield put(
      fireFormModal({
        cancelButton: true,
        header: t`Password Reset Email Sent.`,
        subHeader: t`Please check your inbox, or your spam folder.`,
        confirmButtonText: t`OK`,
        resultStatus: status,
      })
    )
    yield put(updateFormNotLoading())
  } catch (e) {
    yield put(failureResetPassword({ e }))
  }
}

function* watchResetPasswordSaga() {
  yield takeLeading(RESET_PASSWORD_FORM, resetPasswordSaga)
}

function* tokenRegisterUserSaga({ payload }) {
  try {
    const { client_id } = yield select(state => state.config)
    const { email } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: tokenRegisterUserRoute.serverReverse(),
        method: "POST",
        params: { email, ...payload.params, domain: window.location.hostname },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    )
    yield put(successRegisterUser({ data }))
    if (status === 200) navigate("/")
    yield put(cancelRegisterLogin())
    yield put(updateFormNotLoading())
  } catch (e) {
    yield put(failureRegisterUser({ e }))
    yield put(updateFormNotLoading())
  }
}

function* watchTokenRegisterUserSaga() {
  yield takeLeading(TOKEN_REGISTER_USER_FORM, tokenRegisterUserSaga)
}

function* registerUserSaga({ payload }) {
  try {
    const { client_id } = yield select(state => state.config)
    const { email } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: `${registerUserRoute.serverReverse()}?grant_type=password&client_id=${client_id}`,
        method: "POST",
        params: { ...payload.params, email },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    )
    yield put(successRegisterUser({ data }))
    if (status === 200) navigate("/")
    yield put(cancelRegisterLogin())
    yield put(updateFormNotLoading())
  } catch (e) {
    yield put(failureRegisterUser({ e }))
    yield put(updateFormNotLoading())
  }
}

function* watchRegisterUserSaga() {
  yield takeLeading(REGISTER_USER_FORM, registerUserSaga)
}

function* loginUserOptionsSaga({ payload }) {
  const { key } = payload
  try {
    const { data } = yield call(() =>
      request({
        url: loginUserRoute.serverReverse(),
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchLoginUserOptionsSaga() {
  yield takeLeading(LOGIN_USER_OPTIONS, loginUserOptionsSaga)
}

function* loginUserSaga({ payload }) {
  try {
    const { client_id } = yield select(state => state.config)
    const { email } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: `${loginUserRoute.serverReverse()}?grant_type=password&client_id=${client_id}`,
        method: "POST",
        params: { ...payload.params, email },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    )

    yield put(successLoginUser({ data }))
    if (status === 200) navigate("/")
    yield put(cancelRegisterLogin())
    yield put(updateFormNotLoading())
  } catch (e) {
    yield put(failureLoginUser({ e }))
  }
}

function* watchLoginUserSaga() {
  yield takeLeading(LOGIN_USER_FORM, loginUserSaga)
}

function* isUserOptionsSaga({ payload }) {
  const { key } = payload
  try {
    const { data } = yield call(() =>
      request({
        url: isUserRoute.serverReverse(),
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchIsUserOptionsSaga() {
  yield takeLeading(IS_USER_OPTIONS, isUserOptionsSaga)
}

function* isUserSaga({ payload }) {
  try {
    const { data } = yield call(() =>
      request({
        url: isUserRoute.serverReverse(),
        params: payload.params,
        method: "POST",
      })
    )
    yield put(
      successIsUser({
        data: { ...data, authFormState: data.status === "Registered" ? 1 : 2 },
      })
    )
    yield put(updateFormNotLoading())
  } catch (e) {
    yield put(failureIsUser({ e }))
  }
}

function* watchIsUserSaga() {
  yield takeLeading(IS_USER_FORM, isUserSaga)
}

function* logoutUserSaga({ payload }) {
  try {
    navigate(`/`)
    yield put(successLogoutUser())
  } catch (e) {}
}

function* watchLogoutUserSaga() {
  yield takeLeading(LOGOUT_USER, logoutUserSaga)
}

function* confirmPasswordOptionsSaga({ payload }) {
  const { key } = payload

  try {
    const { data } = yield call(() =>
      request({
        url: confirmPasswordRoute.serverReverse(),
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchConfirmPasswordOptionsSaga() {
  yield takeLeading(CONFIRM_PASSWORD_OPTIONS, confirmPasswordOptionsSaga)
}

function* confirmPasswordSaga({ payload }) {
  try {
    const { data, status } = yield call(() =>
      request({
        url: confirmPasswordRoute.serverReverse(),
        method: "POST",
        params: { ...payload.params },
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
    )
    yield put(updateFormNotLoading())
    yield put(
      fireFormModal({
        header: "Password Successfully Changed!",
        subHeader: "Please Proceed to Login.",
        cancelButton: false,
        confirmButtonText: "Proceed to Login",
        confirmButtonOnClick: () => navigate(`/`),
      })
    )
  } catch (e) {
    yield put(failureConfirmPassword({ e }))
    yield put(
      fireFormModal({
        header: "Email Expired!",
        subHeader: "Please send another reset request.",
        type: "error",
        cancelButton: false,
        confirmButtonText: "Send Reset Request",
        confirmButtonOnClick: async () => {
          put(resetPassword({ email: payload.params.email }))
        },
      })
    )
  }
}

function* watchConfirmPasswordSaga() {
  yield takeLeading(CONFIRM_PASSWORD_FORM, confirmPasswordSaga)
}

export default function* rootUserSaga() {
  yield fork(watchGetUserSaga)
  yield fork(watchEditUserSaga)
  yield fork(watchRegisterUserSaga)
  yield fork(watchConfirmPasswordSaga)
  yield fork(watchLoginUserSaga)
  yield fork(watchIsUserSaga)
  yield fork(watchUserOptionsSaga)
  yield fork(watchRegisterUserOptionsSaga)
  yield fork(watchLoginUserOptionsSaga)
  yield fork(watchIsUserOptionsSaga)
  yield fork(watchLogoutUserSaga)
  yield fork(watchResetPasswordSaga)
  yield fork(watchTokenRegisterUserSaga)
  yield fork(watchConfirmPasswordOptionsSaga)
}
