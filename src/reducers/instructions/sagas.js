import { call, put, select, fork, takeLeading } from "redux-saga/effects"

import {
  ADD_INSTRUCTIONS_FORM,
  DELETE_INSTRUCTIONS,
  INSTRUCTIONS_OPTIONS,
  failureAddInstructions,
  failureDeleteInstructions,
  successAddInstructions,
  successDeleteInstructions,
} from "./actions"
import { addInstructionsRoute, deleteInstructionsRoute } from "./routes"
import { request } from "../../utils/request"

import { failureAddOption, successAddOption } from "../options/actions"
import { resolveDeleteForm, resolveForm } from "../forms"

function* instructionsOptionsSaga({ payload }) {
  const { orderId, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addInstructionsRoute.serverReverse({ orderId: orderId }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchInstructionsOptionsSaga() {
  yield takeLeading(INSTRUCTIONS_OPTIONS, instructionsOptionsSaga)
}

function* addInstructionsSaga({ payload }) {
  const { orderId, params } = payload
  const { token } = yield select(state => state.user.auth)
  try {
    const { data, status } = yield call(() =>
      request({
        url: addInstructionsRoute.serverReverse({ orderId }),
        method: "POST",
        token,
        params,
      })
    )
    yield put(successAddInstructions({ data, orderId }))
    yield put(
      resolveForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureAddInstructions({ e }))
  }
}

function* watchAddInstructionsSaga() {
  yield takeLeading(ADD_INSTRUCTIONS_FORM, addInstructionsSaga)
}

function* deleteInstructionsSaga({ payload }) {
  const { orderId } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        method: "DELETE",
        token,
        url: deleteInstructionsRoute.serverReverse({ orderId }),
      })
    )
    yield put(successDeleteInstructions({ orderId, data }))
    yield put(
      resolveDeleteForm({
        category: "ARRANGEMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeleteInstructions({ e }))
  }
}

function* watchDeleteInstructionsSaga() {
  yield takeLeading(DELETE_INSTRUCTIONS, deleteInstructionsSaga)
}

export default function* rootInstructionsSaga() {
  yield fork(watchAddInstructionsSaga)
  yield fork(watchDeleteInstructionsSaga)
  yield fork(watchInstructionsOptionsSaga)
}
