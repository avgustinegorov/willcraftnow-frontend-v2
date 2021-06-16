import { call, put, select, fork, takeLeading } from "redux-saga/effects"

import {
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  GET_ORDER,
  FETCH_ORDERS,
  failureAddOrder,
  failureDeleteOrder,
  failureEditOrder,
  failureGetOrder,
  failureFetchOrders,
  successAddOrder,
  successDeleteOrder,
  successEditOrder,
  successGetOrder,
  successFetchOrders,
  getOrder,
  setCurrentOrder,
} from "./actions"
import {
  addOrderRoute,
  deleteOrderRoute,
  editOrderRoute,
  getOrderRoute,
  fetchOrdersRoute,
} from "./routes"

import navigate from "../../utils/navigate"
import trackCustomEvent from "../../services/trackCustomEvent"
import { request } from "../../utils/request"

function* fetchOrdersSaga() {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({ url: fetchOrdersRoute.serverReverse(), token })
    )
    yield put(successFetchOrders({ data }))
  } catch (e) {
    yield put(failureFetchOrders({ e }))
  }
}

function* watchFetchOrdersSaga() {
  yield takeLeading(FETCH_ORDERS, fetchOrdersSaga)
}

function* getOrderSaga({ payload: { orderId } }) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({ url: getOrderRoute.serverReverse({ orderId }), token })
    )
    yield put(successGetOrder({ data, orderId }))
  } catch (e) {
    yield put(failureGetOrder({ e }))
  }
}

function* watchGetOrderSaga() {
  yield takeLeading(GET_ORDER, getOrderSaga)
}

function* addOrderSaga({ payload }) {
  const { orderType, nextUrl } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addOrderRoute.serverReverse({ orderType }),
        method: "POST",
        token,
        params: {
          order_type: orderType,
          has_prior_will: false,
          tncs: false,
          disclaimer: false,
        },
      })
    )
    yield put(successAddOrder({ data, orderType }))
    yield put(getOrder({ orderId: data.id }))
    yield put(setCurrentOrder({ orderId: data.id, orderType }))
    trackCustomEvent({
      category: "AddToCart",
      action: "Success",
    })
    navigate(nextUrl({ orderId: data.id }))
  } catch (e) {
    yield put(failureAddOrder({ e }))
  }
}

function* watchAddOrderSaga() {
  yield takeLeading(ADD_ORDER, addOrderSaga)
}

function* editOrderSaga({ payload }) {
  try {
    const { orderId, orderType, nextUrl } = payload
    yield put(getOrder({ orderId }))
    yield put(setCurrentOrder({ orderId: orderId, orderType }))
    navigate(nextUrl)
  } catch (e) {
    console.log(e)

    yield put(failureEditOrder({ e }))
  }
}

function* watchEditOrderSaga() {
  yield takeLeading(EDIT_ORDER, editOrderSaga)
}

function* deleteOrderSaga({ payload }) {
  const { orderId } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        url: deleteOrderRoute.serverReverse({ orderId }),
        method: "DELETE",
        token,
      })
    )
    yield put(successDeleteOrder({ data, orderId }))
  } catch (e) {
    yield put(failureDeleteOrder({ e }))
  }
}

function* watchDeleteOrderSaga() {
  yield takeLeading(DELETE_ORDER, deleteOrderSaga)
}

export default function* rootOrderSaga() {
  yield fork(watchFetchOrdersSaga)
  yield fork(watchGetOrderSaga)
  yield fork(watchAddOrderSaga)
  yield fork(watchDeleteOrderSaga)
  yield fork(watchEditOrderSaga)
}
