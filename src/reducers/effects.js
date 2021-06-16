import { call, fork, take, cancel } from "redux-saga/effects"

export const takeEveryRegex = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take("*")
      if (pattern.test(action.type)) {
        console.log("REGEX", pattern, action.type)
        yield fork(saga, ...args.concat(action))
      }
    }
  })

export const takeLeadingRegex = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take("*")
      if (pattern.test(action.type)) {
        yield call(saga, ...args.concat(action))
      }
    }
  })

export const takeLatestRegex = (pattern, saga, ...args) =>
  fork(function* () {
    let lastTask
    while (true) {
      const action = yield take("*")
      if (pattern.test(action.type)) {
        if (lastTask) {
          yield cancel(lastTask) // cancel is no-op if the task has already terminated
        }
        lastTask = yield fork(saga, ...args.concat(action))
      }
    }
  })
