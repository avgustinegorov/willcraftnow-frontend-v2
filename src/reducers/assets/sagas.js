import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import {
  ADD_ASSET_FORM,
  DELETE_ASSET,
  EDIT_ASSET_FORM,
  FETCH_ASSETS,
  ASSET_OPTIONS,
  failureAddAsset,
  failureDeleteAsset,
  failureEditAsset,
  failureFetchAssets,
  successAddAsset,
  successDeleteAsset,
  successEditAsset,
  successFetchAssets,
} from "./actions"
import {
  addAssetRoute,
  deleteAssetRoute,
  editAssetRoute,
  fetchAssetRoute,
} from "./routes"
import { request } from "../../utils/request"
import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* assetOptionsSaga({ payload }) {
  const { orderId, assetType, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addAssetRoute.serverReverse({
          orderId,
          assetType,
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

function* watchAddAssetOptionsSaga() {
  yield takeLeading(ASSET_OPTIONS, assetOptionsSaga)
}

function* fetchAssetsSaga() {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        token,
        url: fetchAssetRoute.serverReverse(),
      })
    )
    yield put(successFetchAssets({ data: data }))
  } catch (e) {
    yield put(failureFetchAssets({ e }))
  }
}

function* watchFetchAssetsSaga() {
  yield takeLeading(FETCH_ASSETS, fetchAssetsSaga)
}

function* addAssetSaga({ payload }) {
  const { orderId, assetType, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addAssetRoute.serverReverse({ orderId, assetType }),
        params: params,
        method: "POST",
      })
    )
    yield put(successAddAsset({ data, orderId, assetType }))
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureAddAsset({ e }))
  }
}

function* watchAddAssetSaga() {
  yield takeLeading(ADD_ASSET_FORM, addAssetSaga)
}

function* editAssetSaga({ payload }) {
  const { orderId, assetType, assetId, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: editAssetRoute.serverReverse({ orderId, assetType, assetId }),
        params: params,
        method: "PUT",
      })
    )
    yield put(successEditAsset({ data, orderId, assetType, assetId }))
    yield put(
      resolveForm({
        category: "ASSET",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureEditAsset({ e }))
  }
}

function* watchEditAssetSaga() {
  yield takeLeading(EDIT_ASSET_FORM, editAssetSaga)
}

function* deleteAssetSaga({ payload }) {
  const { orderId, assetType, assetId } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: deleteAssetRoute.serverReverse({ orderId, assetType, assetId }),

        method: "DELETE",
      })
    )
    yield put(successDeleteAsset({ data, orderId, assetType, assetId }))
    yield put(
      resolveDeleteForm({
        category: "ASSET",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeleteAsset({ e }))
  }
}

function* watchDeleteAssetSaga() {
  yield takeLeading(DELETE_ASSET, deleteAssetSaga)
}

export default function* rootAssetSaga() {
  yield fork(watchFetchAssetsSaga)
  yield fork(watchAddAssetSaga)
  yield fork(watchDeleteAssetSaga)
  yield fork(watchEditAssetSaga)
  yield fork(watchAddAssetOptionsSaga)
}
