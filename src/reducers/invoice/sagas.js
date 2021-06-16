import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import { t } from "@lingui/macro"
import {
  GET_LATEST_INVOICE,
  successGetLatestInvoice,
  failureGetLatestInvoice,
  failureAddDiscount,
  ADD_DISCOUNT,
  getLatestInvoice,
  ADD_PAYMENT,
  toggleDiscountSubmitted,
} from "./actions"
import {
  addDiscountRoute,
  addPaymentRoute,
  getLatestInvoiceRoute,
} from "./routes"
import { request } from "../../utils/request"
import { fireFormModal } from "../formModal/actions"
import navigate from "../../utils/navigate"
import { toCapitalCase } from "../../FormFactory/utils"

function* addPaymentSaga({ payload }) {
  try {
    const { orderId, params } = payload
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addPaymentRoute.serverReverse({ orderId }),
        method: "POST",
        params,
      })
    )
    const { orderType } = yield select(state => state.order.current)
    yield put(
      fireFormModal({
        cancelButton: false,
        header: t`Payment Successful!`,
        subHeader: [
          t`Thanks for using WillCraft.`,
          t`An email with the final draft of your ${toCapitalCase(
            orderType
          )} is already on its way. You may also download it from your Dashboard.`,
        ],
        confirmButtonText: t`Return to Dashboard`,
        confirmButtonOnClick: () => navigate(`/`),
      })
    )
    // TODO:
    // fbTrack("track", "Purchase", {
    //   value: parseFloat(invoiceData.net_price_after_card_fees),
    //   currency: "SGD",
    // })
    // trackCustomEvent({
    //   category: "Payment",
    //   action: "Success",
    //   value: parseInt(invoiceData.net_price_after_card_fees),
    // })
  } catch (e) {
    yield put(
      fireFormModal({
        fire: true,
        type: "error",
        header: t`Something went wrong!`,
        subHeader: t`Please try again.`,
      })
    )
  }
}

function* watchAddPaymentSagaSaga() {
  yield takeLeading(ADD_PAYMENT, addPaymentSaga)
}

function* addDiscountSaga({ payload }) {
  const { orderId, params } = payload
  yield put(toggleDiscountSubmitted({ orderId }))
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addDiscountRoute.serverReverse({ orderId }),
        method: "POST",
        params,
      })
    )
    yield put(
      fireFormModal({
        cancelButton: false,
        header: t`Discount Code Applied!`,
        subHeader: t`Please continue to make payment.`,
        confirmButtonText: t`Ok`,
      })
    )
    yield put(getLatestInvoice({ orderId }))
    yield put(toggleDiscountSubmitted({ orderId }))
  } catch (e) {
    yield put(failureAddDiscount({ orderId, e }))
    yield put(toggleDiscountSubmitted({ orderId }))
  }
}

function* watchAddDiscountSagaSaga() {
  yield takeLeading(ADD_DISCOUNT, addDiscountSaga)
}

function* getLatestInvoiceSaga({ payload }) {
  try {
    const { orderId } = payload
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: getLatestInvoiceRoute.serverReverse({ orderId }),
        method: "GET",
      })
    )
    yield put(successGetLatestInvoice({ data, orderId }))
  } catch (e) {
    yield put(failureGetLatestInvoice({ e }))
  }
}

function* watchGetLatestInvoiceSaga() {
  yield takeLeading(GET_LATEST_INVOICE, getLatestInvoiceSaga)
}

export default function* rootAppointmentSaga() {
  yield fork(watchGetLatestInvoiceSaga)
  yield fork(watchAddDiscountSagaSaga)
  yield fork(watchAddPaymentSagaSaga)
}
