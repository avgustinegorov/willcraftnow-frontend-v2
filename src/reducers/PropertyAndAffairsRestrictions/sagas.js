import { call, put, select, fork, takeLeading } from "redux-saga/effects"

import {
  ADD_PROPERTY_AFFAIRS_RESTRICTIONS_FORM,
  DELETE_PROPERTY_AFFAIRS_RESTRICTIONS,
  PROPERTY_AFFAIRS_RESTRICTIONS_OPTIONS,
  failureAddPropertyAffairsRestrictions,
  failureDeletePropertyAffairsRestrictions,
  successAddPropertyAffairsRestrictions,
  successDeletePropertyAffairsRestrictions,
} from "./actions"
import {
  addPropertyAffairsRestrictionsRoute,
  deletePropertyAffairsRestrictionsRoute,
} from "./routes"
import { request } from "../../utils/request"
import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* propertyAffairsRestrictionsOptionsSaga({ payload }) {
  const { orderId, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addPropertyAffairsRestrictionsRoute.serverReverse({
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

function* watchPropertyAffairsRestrictionsOptionsSaga() {
  yield takeLeading(
    PROPERTY_AFFAIRS_RESTRICTIONS_OPTIONS,
    propertyAffairsRestrictionsOptionsSaga
  )
}

function* addPropertyAffairsRestrictionsSaga({ payload }) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { orderId, params } = payload
    const { data, status } = yield call(() =>
      request({
        url: addPropertyAffairsRestrictionsRoute.serverReverse({ orderId }),
        method: "POST",
        token,
        params,
      })
    )
    yield put(successAddPropertyAffairsRestrictions({ data, orderId }))
    yield put(
      resolveForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureAddPropertyAffairsRestrictions({ e }))
  }
}

function* watchAddPropertyAffairsRestrictionsSaga() {
  yield takeLeading(
    ADD_PROPERTY_AFFAIRS_RESTRICTIONS_FORM,
    addPropertyAffairsRestrictionsSaga
  )
}

function* deletePropertyAffairsRestrictionsSaga({ payload }) {
  const { orderId } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        method: "DELETE",
        token,
        url: deletePropertyAffairsRestrictionsRoute.serverReverse({ orderId }),
      })
    )
    yield put(successDeletePropertyAffairsRestrictions({ data, orderId }))
    yield put(
      resolveDeleteForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeletePropertyAffairsRestrictions({ e }))
  }
}

function* watchDeletePropertyAffairsRestrictionsSaga() {
  yield takeLeading(
    DELETE_PROPERTY_AFFAIRS_RESTRICTIONS,
    deletePropertyAffairsRestrictionsSaga
  )
}

export default function* rootPropertyAffairsRestrictionsSaga() {
  yield fork(watchAddPropertyAffairsRestrictionsSaga)
  yield fork(watchDeletePropertyAffairsRestrictionsSaga)
  yield fork(watchPropertyAffairsRestrictionsOptionsSaga)
}
