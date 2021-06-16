import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import {
  ADD_ALLOCATION_FORM,
  DELETE_ALLOCATION,
  EDIT_ALLOCATION_FORM,
  ALLOCATION_OPTIONS,
  EDIT_ALLOCATION_FORM_OPTIONS,
  failureAddAllocation,
  failureDeleteAllocation,
  failureEditAllocation,
  successAddAllocation,
  successDeleteAllocation,
  successEditAllocation,
} from "./actions"
import {
  addAllocationRoute,
  deleteAllocationRoute,
  editAllocationRoute,
} from "./routes"
import { request } from "../../utils/request"
import { failureAddOption, successAddOption } from "../options/actions"
import { resolveForm, resolveDeleteForm } from "../forms"

function* addAllocationOptionsSaga({ payload }) {
  const { orderId, assetId, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addAllocationRoute.serverReverse({ orderId, assetId }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchAllocationOptionsSaga() {
  yield takeLeading(ALLOCATION_OPTIONS, addAllocationOptionsSaga)
}

function* addAllocationSaga({ payload }) {
  try {
    const { orderId, assetId, params } = payload
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addAllocationRoute.serverReverse({ orderId, assetId }),
        params: params,
        method: "POST",
      })
    )
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
      })
    )
    if (status < 300) {
      yield put(successAddAllocation({ data, orderId, assetId }))
    }
  } catch (e) {
    yield put(failureAddAllocation({ e }))
  }
}

function* watchAddAllocationSaga() {
  yield takeLeading(ADD_ALLOCATION_FORM, addAllocationSaga)
}

function* editAllocationSaga({ payload }) {
  const { orderId, allocationId, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: editAllocationRoute.serverReverse({ orderId, allocationId }),
        params: params,
        method: "PUT",
      })
    )
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
      })
    )
    if (status < 300) {
      yield put(successEditAllocation({ data, orderId, allocationId }))
    }
  } catch (e) {
    yield put(failureEditAllocation({ e }))
  }
}

function* watchEditAllocationSaga() {
  yield takeLeading(EDIT_ALLOCATION_FORM, editAllocationSaga)
}

function* deleteAllocationSaga({ payload }) {
  const { orderId, allocationId, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: deleteAllocationRoute.serverReverse({ orderId, allocationId }),
        method: "DELETE",
      })
    )
    yield put(
      resolveDeleteForm({
        category: "ALLOCATION",
        resultStatus: status,
        message: null,
      })
    )
    yield put(successDeleteAllocation({ data, orderId, allocationId }))
  } catch (e) {
    yield put(failureDeleteAllocation({ e }))
  }
}

function* watchDeleteAllocationSaga() {
  yield takeLeading(DELETE_ALLOCATION, deleteAllocationSaga)
}

export default function* rootAllocationSaga() {
  yield fork(watchAddAllocationSaga)
  yield fork(watchDeleteAllocationSaga)
  yield fork(watchEditAllocationSaga)
  yield fork(watchAllocationOptionsSaga)
}
