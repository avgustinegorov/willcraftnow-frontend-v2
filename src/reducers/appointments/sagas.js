import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import {
  DONEE_POWER_OPTIONS,
  APPOINTMENT_OPTIONS,
  ADD_APPOINTMENT_FORM,
  DELETE_APPOINTMENT,
  ADD_DONEE_POWERS_FORM,
  DELETE_DONEE_POWERS,
  failureAddAppointment,
  failureDeleteAppointment,
  successAddAppointment,
  successDeleteAppointment,
  successAddDoneePowers,
  failureAddDoneePowers,
  successDeleteDoneePowers,
  failureDeleteDoneePowers,
} from "./actions"
import {
  addAppointmentRoute,
  deleteAppointmentRoute,
  addDoneePowersRoute,
  deleteDoneePowersRoute,
} from "./routes"
import { request } from "../../utils/request"

import { failureAddOption, successAddOption } from "../options/actions"
import {
  resolveDeleteForm,
  resolveForm,
  updateFormErrors,
} from "../forms/actions"

function* appointmentOptionsSaga({ payload }) {
  const { orderId, key } = payload

  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addAppointmentRoute.serverReverse({ orderId }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchAppointmentOptionsSaga() {
  yield takeLeading(APPOINTMENT_OPTIONS, appointmentOptionsSaga)
}

function* addAppointmentSaga({ payload }) {
  try {
    console.log("ADD APPOINTMENT SAGA")
    const { orderId, params } = payload
    const { person, updated_type } = params
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addAppointmentRoute.serverReverse({ orderId }),
        params: params,
        method: "POST",
      })
    )
    yield put(successAddAppointment({ data, orderId, person, updated_type }))
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureAddAppointment({ e }))
  }
}

function* watchAddAppointmentSaga() {
  yield takeLeading(ADD_APPOINTMENT_FORM, addAppointmentSaga)
}

function* deleteAppointmentSaga({ payload }) {
  try {
    const { orderId, params } = payload
    const { person, updated_type } = params
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: deleteAppointmentRoute.serverReverse({
          orderId,
        }),
        params: params,
        method: "DELETE",
      })
    )
    yield put(successDeleteAppointment({ data, orderId, person, updated_type }))
    yield put(
      resolveDeleteForm({
        category: "APPOINTMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeleteAppointment({ e }))
  }
}

function* watchDeleteAppointmentSaga() {
  yield takeLeading(DELETE_APPOINTMENT, deleteAppointmentSaga)
}

// *******************

function* doneePowersOptionsSaga({ payload }) {
  const { orderId, key } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: addDoneePowersRoute.serverReverse({ orderId }),
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchDoneePowersOptionsSaga() {
  yield takeLeading(DONEE_POWER_OPTIONS, doneePowersOptionsSaga)
}

function* addDoneePowersSaga({ payload }) {
  try {
    const { orderId, params, updated_type } = payload
    const { donee } = params
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: addDoneePowersRoute.serverReverse({ orderId }),
        params: params,
        method: "POST",
      })
    )
    yield put(
      successAddDoneePowers({ data, orderId, person: donee, updated_type })
    )
    yield put(
      resolveForm({
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureAddDoneePowers({ e }))
  }
}

function* watchAddDoneePowersSaga() {
  yield takeLeading(ADD_DONEE_POWERS_FORM, addDoneePowersSaga)
}

function* deleteDoneePowersSaga({ payload }) {
  try {
    const { orderId, doneePowersId, person, updated_type } = payload
    const { token } = yield select(state => state.user.auth)
    const { data, status } = yield call(() =>
      request({
        token,
        url: deleteDoneePowersRoute.serverReverse({
          orderId,
          doneePowersId,
        }),
        method: "DELETE",
      })
    )
    yield put(successDeleteDoneePowers({ data, orderId, person, updated_type }))
    yield put(
      resolveDeleteForm({
        category: "APPOINTMENT",
        resultStatus: status,
        message: null,
      })
    )
  } catch (e) {
    yield put(failureDeleteDoneePowers({ e }))
  }
}

function* watchDeleteDoneePowersSaga() {
  yield takeLeading(DELETE_DONEE_POWERS, deleteDoneePowersSaga)
}

export default function* rootAppointmentSaga() {
  yield fork(watchAddAppointmentSaga)
  yield fork(watchDeleteAppointmentSaga)
  yield fork(watchAppointmentOptionsSaga)
  yield fork(watchDoneePowersOptionsSaga)
  yield fork(watchAddDoneePowersSaga)
  yield fork(watchDeleteDoneePowersSaga)
}
