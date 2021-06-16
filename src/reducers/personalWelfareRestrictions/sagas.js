import { call, put, select, fork, takeLeading } from "redux-saga/effects"

import {
  ADD_PERSONAL_WELFARE_RESTRICTIONS_FORM,
  DELETE_PERSONAL_WELFARE_RESTRICTIONS,
  PERSONAL_WELFARE_RESTRICTIONS_OPTIONS,
  failureAddPersonalWelfareRestrictions,
  failureDeletePersonalWelfareRestrictions,
  successAddPersonalWelfareRestrictions,
  successDeletePersonalWelfareRestrictions,
} from "./actions"
import {
  addPersonalWelfareRestrictionsRoute,
  deletePersonalWelfareRestrictionsRoute,
} from "./routes"
import { request } from "../../utils/request"

import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* personalWelfareRestrictionsOptionsSaga({ payload }) {
  const { orderId, key } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addPersonalWelfareRestrictionsRoute.serverReverse({
          orderId: orderId,
        }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchPersonalWelfareRestrictionsOptionsSaga() {
  yield takeLeading(
    PERSONAL_WELFARE_RESTRICTIONS_OPTIONS,
    personalWelfareRestrictionsOptionsSaga
  )
}

function* addPersonalWelfareRestrictionsSaga({ payload }) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { orderId, params } = payload
    const { data, status } = yield call(() =>
      request({
        url: addPersonalWelfareRestrictionsRoute.serverReverse({ orderId }),
        method: "POST",
        token,
        params,
      })
    )
    yield put(successAddPersonalWelfareRestrictions({ data, orderId }))
    yield put(
      resolveForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureAddPersonalWelfareRestrictions({ e }))
  }
}

function* watchAddPersonalWelfareRestrictionsSaga() {
  yield takeLeading(
    ADD_PERSONAL_WELFARE_RESTRICTIONS_FORM,
    addPersonalWelfareRestrictionsSaga
  )
}

function* deletePersonalWelfareRestrictionsSaga({ payload }) {
  const { orderId } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        method: "DELETE",
        token,
        url: deletePersonalWelfareRestrictionsRoute.serverReverse({ orderId }),
      })
    )
    yield put(successDeletePersonalWelfareRestrictions({ data, orderId }))
    yield put(
      resolveDeleteForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeletePersonalWelfareRestrictions({ e }))
  }
}

function* watchDeletePersonalWelfareRestrictionsSaga() {
  yield takeLeading(
    DELETE_PERSONAL_WELFARE_RESTRICTIONS,
    deletePersonalWelfareRestrictionsSaga
  )
}

export default function* rootPersonalWelfareRestrictionsSaga() {
  yield fork(watchAddPersonalWelfareRestrictionsSaga)
  yield fork(watchDeletePersonalWelfareRestrictionsSaga)
  yield fork(watchPersonalWelfareRestrictionsOptionsSaga)
}
