import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import {
  ADD_LEGAL_SERVICE_FORM,
  DELETE_LEGAL_SERVICE,
  LEGAL_SERVICE_OPTIONS,
  successAddLegalService,
  failureAddLegalService,
  successDeleteLegalService,
  failureDeleteLegalService,
} from "./actions"
import { addLegalServiceRoute, deleteLegalServiceRoute } from "./routes"
import { request } from "../../utils/request"
import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* legalServiceOptionsSaga({ payload }) {
  const { orderId, legalService, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addLegalServiceRoute.serverReverse({ orderId, legalService }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchLegalServiceOptionsSaga() {
  yield takeLeading(LEGAL_SERVICE_OPTIONS, legalServiceOptionsSaga)
}

function* addLegalServiceSaga({ payload }) {
  const { orderId, legalService, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: addLegalServiceRoute.serverReverse({ orderId, legalService }),
        params: { ...params, service_type: legalService },
        token,
        method: "POST",
      })
    )
    yield put(successAddLegalService({ data, orderId, legalService }))
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    console.log(e)

    yield put(failureAddLegalService({ e }))
  }
}

function* watchAddLegalServiceSaga() {
  yield takeLeading(ADD_LEGAL_SERVICE_FORM, addLegalServiceSaga)
}

function* deleteLegalServiceSaga({ payload }) {
  try {
    const { orderId, legalService, params } = payload
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: deleteLegalServiceRoute.serverReverse({ orderId, legalService }),
        params: params,
        token,
        method: "DELETE",
      })
    )
    yield put(successDeleteLegalService({ data, orderId, legalService }))
    yield put(
      resolveDeleteForm({
        category: "LAWYER_APPOINTMENT",
        resultStatus: status,
        message: data.message,
      })
    )
  } catch (e) {
    yield put(failureDeleteLegalService({ e }))
  }
}

function* watchDeleteLegalServiceSaga() {
  yield takeLeading(DELETE_LEGAL_SERVICE, deleteLegalServiceSaga)
}

export default function* rootLegalServiceSaga() {
  yield fork(watchLegalServiceOptionsSaga)
  yield fork(watchAddLegalServiceSaga)
  yield fork(watchDeleteLegalServiceSaga)
}
