import { call, fork, put, take, spawn } from "redux-saga/effects"
import { takeEveryRegex } from "../effects"
import { logoutUser } from "../user"

function* unauthorisedSaga({ payload, type }) {
  const {
    e: { data, status },
  } = payload
  if (status === 401) {
    yield put(logoutUser())
  }
  if (status === 500) {
    console.log("Server is Down")
  }
}

export function* watchUnauthorisedSaga() {
  yield takeEveryRegex(/^FAILURE_/, unauthorisedSaga)
  // yield spawn(takeEveryRegex, /^FAILURE_/, unauthorisedSaga)
}

// failure with form
// ^FAILURE[/s/S]*((?=.*FORM))

// failure without form
// ^FAILURE[/s/S]*((?!.*FORM))

export default function* rootSaga() {
  yield fork(watchUnauthorisedSaga)
}
