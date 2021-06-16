import { call, put, fork, select, takeEvery } from "redux-saga/effects"

import { ADD_OPTION, failureAddOption, successAddOption } from "./actions"

import { request } from "../../utils/request"

function* addOptionsSaga({ payload }) {
  const { key, url } = payload
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: url,
        token,
        method: "OPTIONS",
      })
    )
    yield put(successAddOption({ options: data.actions, key }))
  } catch (e) {
    yield put(failureAddOption({ e }))
  }
}

function* watchAddOptionsSaga() {
  // yield takeEvery(ADD_OPTION, addOptionsSaga)
}

export default function* rootOptionsSaga() {
  yield fork(watchAddOptionsSaga)
}
