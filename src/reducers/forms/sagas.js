import { call, put, fork, takeEvery, takeLeading } from "redux-saga/effects"

import {
  RESOLVE_FORMSTATE,
  RESOLVE_DELETE_FORMSTATE,
  CANCEL_FORMSTATE,
  CONTINUE_FORMSTATE,
  REDIRECT_FORMSTATE,
  addForm,
  deleteForm,
  updateForm,
  updateFormErrors,
  updateFormLoading,
} from "./actions"
import navigate from "../../utils/navigate"
import { fireFormModal } from "../formModal/actions"
import { select } from "redux-saga/effects"
import { takeEveryRegex } from "../effects"

function* resolveFormSaga({ payload, action }) {
  const state = yield select(state => state.forms.data)
  const currentState = state[state.length - 1]
  const pathName = currentState.successPathname
  yield navigate(pathName)
  yield put(deleteForm({ formIndex: state.length - 1 }))
  yield put(
    fireFormModal({
      action: currentState.action,
      category: currentState.category,
      message: payload.message,
      resultStatus: payload.resultStatus,
    })
  )
}

function* watchResolveFormSaga() {
  yield takeLeading(RESOLVE_FORMSTATE, resolveFormSaga)
}

function* resolveDeleteFormSaga({ payload, action }) {
  yield put(
    fireFormModal({
      action: "DELETE",
      category: payload.category,
      message: payload.message,
      resultStatus: payload.resultStatus,
    })
  )
}

function* watchResolveDeleteFormSaga() {
  yield takeLeading(RESOLVE_DELETE_FORMSTATE, resolveDeleteFormSaga)
}

function* cancelFormSaga({ payload, action }) {
  const state = yield select(state => state.forms.data)
  const currentState = state[state.length - 1]
  const pathName = currentState.successPathname
  yield navigate(pathName)
  yield put(deleteForm({ formIndex: state.length - 1 }))
}

function* watchCancelFormSaga() {
  yield takeLeading(CANCEL_FORMSTATE, cancelFormSaga)
}

function* continueFormSaga({ payload, action }) {
  yield navigate(payload.redirectPath)
  yield put(updateForm(payload))
}

function* watchContinueFormSaga() {
  yield takeLeading(CONTINUE_FORMSTATE, continueFormSaga)
}

function* redirectFormSaga({ payload, action }) {
  yield navigate(payload.redirectPath)
  yield put(addForm(payload))
}

function* watchRedirectFormSaga() {
  yield takeLeading(REDIRECT_FORMSTATE, redirectFormSaga)
}

function* formFailureSaga({ payload, type }) {
  //note that here the payload is always an error
  const {
    e: { data, status },
  } = payload

  yield put(updateFormErrors({ data }))
}

export function* watchFormFailureSaga() {
  yield takeEveryRegex(/^FAILURE[/s/S]*((?=.*FORM))/, formFailureSaga)
}

function* formDispatchedSaga({ payload, type }) {
  yield put(updateFormLoading())
}

export function* watchFormDispatchedSaga() {
  yield takeEveryRegex(
    /(?=.*FORM.*)(?!.*FAILURE.*)(?!.*SUCCESS.*)(?!.*LOADING.*)(?!.*FORMSTATE.*)(?!.*MODAL.*)/y,
    formDispatchedSaga
  )
}

export default function* rootAssetSaga() {
  yield fork(watchResolveFormSaga)
  yield fork(watchFormDispatchedSaga)
  yield fork(watchResolveDeleteFormSaga)
  yield fork(watchCancelFormSaga)
  yield fork(watchContinueFormSaga)
  yield fork(watchRedirectFormSaga)
  yield fork(watchFormFailureSaga)
}
