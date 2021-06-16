import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import {
  ADD_ENTITY_FORM,
  DELETE_ENTITY,
  EDIT_ENTITY_FORM,
  FETCH_ENTITYS,
  ENTITY_OPTIONS,
  failureAddEntity,
  failureDeleteEntity,
  failureEditEntity,
  failureFetchEntitys,
  successAddEntity,
  successDeleteEntity,
  successEditEntity,
  successFetchEntitys,
} from "./actions"
import {
  addEntityRoute,
  deleteEntityRoute,
  editEntityRoute,
  fetchEntitysRoute,
} from "./routes"
import { addOrderEntity, deleteOrderEntity } from "../appointments/actions"
import { request } from "../../utils/request"

import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* entityOptionsSaga({ payload }) {
  const { orderId, entityType, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addEntityRoute.serverReverse({
          orderId: orderId,
          entityType: entityType.toLowerCase(),
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

function* watchEntityOptionsSaga() {
  yield takeLeading(ENTITY_OPTIONS, entityOptionsSaga)
}

function* fetchEntitysSaga(payload) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        token,
        url: fetchEntitysRoute.serverReverse(),
        method: "GET",
      })
    )
    yield put(successFetchEntitys({ data }))
  } catch (e) {
    yield put(failureFetchEntitys({ e }))
  }
}

function* watchFetchEntitysSaga() {
  yield takeLeading(FETCH_ENTITYS, fetchEntitysSaga)
}

function* addEntitySaga({ payload }) {
  try {
    const { orderId, entityType, params } = payload
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addEntityRoute.serverReverse({ orderId, entityType }),
        params: params,
        method: "POST",
      })
    )
    yield put(successAddEntity({ data, orderId, entityType }))
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
        category: "PERSON",
      })
    )
    yield put(addOrderEntity({ person: data.id }))
  } catch (e) {
    yield put(failureAddEntity({ e }))
  }
}

function* watchAddEntitySaga() {
  yield takeLeading(ADD_ENTITY_FORM, addEntitySaga)
}

function* editEntitySaga({ payload }) {
  const { orderId, entityType, personId, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: editEntityRoute.serverReverse({ orderId, entityType, personId }),
        params: params,
        method: "PUT",
      })
    )
    yield put(successEditEntity({ data, orderId, entityType, personId }))
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
        category: "PERSON",
      })
    )
  } catch (e) {
    yield put(failureEditEntity({ e }))
  }
}

function* watchEditEntitySaga() {
  yield takeLeading(EDIT_ENTITY_FORM, editEntitySaga)
}

function* deleteEntitySaga({ payload }) {
  const { orderId, entityType, personId, params } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: deleteEntityRoute.serverReverse({ orderId, entityType, personId }),
        params: params,
        method: "DELETE",
      })
    )
    yield put(successDeleteEntity({ data, orderId, entityType, personId }))
    yield put(deleteOrderEntity({ person: personId }))
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
        category: "PERSON",
      })
    )
  } catch (e) {
    yield put(failureDeleteEntity({ e }))
  }
}

function* watchDeleteEntitySaga() {
  yield takeLeading(DELETE_ENTITY, deleteEntitySaga)
}

export default function* rootEntitySaga() {
  yield fork(watchFetchEntitysSaga)
  yield fork(watchAddEntitySaga)
  yield fork(watchDeleteEntitySaga)
  yield fork(watchEditEntitySaga)
  yield fork(watchEntityOptionsSaga)
}
