import { call, put, fork, select, takeLeading } from "redux-saga/effects"

import { FETCH_FIRMS, failureFetchFirms, successFetchFirms } from "./actions"
import { fetchFirmsRoute } from "./routes"
import { request } from "../../utils/request"

function* fetchFirmsSaga(payload) {
  try {
    const { token } = yield select(state => state.user.auth)
    const { data } = yield call(() =>
      request({
        url: fetchFirmsRoute.serverReverse(),
        method: "GET",
        token,
      })
    )
    yield put(successFetchFirms({ data: data }))
  } catch (e) {
    yield put(failureFetchFirms({ e }))
  }
}

function* watchFetchFirmsSaga() {
  yield takeLeading(FETCH_FIRMS, fetchFirmsSaga)
}

export default function* rootFirmSaga() {
  yield fork(watchFetchFirmsSaga)
}
