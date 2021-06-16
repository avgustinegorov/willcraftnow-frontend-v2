import { call, put, select, fork, takeLeading } from "redux-saga/effects"

import {
  ADD_LAST_RITES_FORM,
  DELETE_LAST_RITES,
  LAST_RITES_OPTIONS,
  failureAddLastRites,
  failureDeleteLastRites,
  successAddLastRites,
  successDeleteLastRites,
} from "./actions"
import { addLastRitesRoute, deleteLastRitesRoute } from "./routes"
import { request } from "../../utils/request"
import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* lastRitesOptionsSaga({ payload }) {
  const { orderId, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addLastRitesRoute.serverReverse({ orderId: orderId }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchLastRitesOptionsSaga() {
  yield takeLeading(LAST_RITES_OPTIONS, lastRitesOptionsSaga)
}

function* addLastRitesSaga({ payload }) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { orderId, params } = payload
    const { data, status } = yield call(() =>
      request({
        url: addLastRitesRoute.serverReverse({ orderId }),
        method: "POST",
        token,
        params,
      })
    )
    yield put(successAddLastRites({ data, orderId }))
    yield put(
      resolveForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    console.log("FAIL", e)
    yield put(failureAddLastRites({ e }))
  }
}

function* watchAddLastRitesSaga() {
  yield takeLeading(ADD_LAST_RITES_FORM, addLastRitesSaga)
}

function* deleteLastRitesSaga({ payload }) {
  const { orderId } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        method: "DELETE",
        token,
        url: deleteLastRitesRoute.serverReverse({ orderId }),
      })
    )
    yield put(successDeleteLastRites({ data, orderId }))
    yield put(
      resolveDeleteForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeleteLastRites({ e }))
  }
}

function* watchDeleteLastRitesSaga() {
  yield takeLeading(DELETE_LAST_RITES, deleteLastRitesSaga)
}

export default function* rootLastRitesSaga() {
  yield fork(watchAddLastRitesSaga)
  yield fork(watchDeleteLastRitesSaga)
  yield fork(watchLastRitesOptionsSaga)
}
