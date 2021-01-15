import { all, fork } from 'redux-saga/effects'

import users from './users/usersSagas'

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(users)])
}
