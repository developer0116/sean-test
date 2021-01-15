/**
 * @module Users
 * @desc Users
 */

import { all, put, select, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './usersActionTypes'
import { PAGE_SIZE } from 'const'
import { searchUserAPI, getUserProfile, getUserRepos } from 'api'
import Swal from 'sweetalert2'
import { pick } from 'lodash'
import {
  getUserSearchFromCache,
  getUserInfoFromCache,
} from 'state/cache/cacheReducer'

interface IfetchUsers {
  payload: string
}

export function* fetchUsers({ payload: query }: IfetchUsers) {
  const cached = yield select(getUserSearchFromCache(query))
  if (cached) {
    yield put({
      type: actionTypes.FETCH_USERS_SUCCESS,
      payload: {
        data: cached,
        query,
      },
    })
    return
  }
  try {
    const res = yield searchUserAPI({
      page: 0,
      q: query,
      per_page: PAGE_SIZE,
    })
    const userData = yield all(
      res.data.items.map((item: any) => getUserProfile(item.login))
    )
    yield put({
      type: actionTypes.FETCH_USERS_SUCCESS,
      payload: {
        data: res.data.items.map((d: any, index: number) => ({
          ...pick(d, 'avatar_url', 'login'),
          ...pick(userData[index].data, 'public_repos'),
        })),
        query,
      },
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: error.name,
      text: error.message,
    })
    yield put({
      type: actionTypes.FETCH_USERS_FAILURE,
      payload: error,
    })
  }
}

interface IfetchUserInfo {
  payload: string
}
export function* fetchUserInfo({ payload: id }: IfetchUserInfo) {
  const cached = yield select(getUserInfoFromCache(id))
  if (cached) {
    yield put({
      type: actionTypes.FETCH_USER_INFO_SUCCESS,
      payload: {
        data: cached.userInfo,
        id,
      },
    })
    yield put({
      type: actionTypes.FETCH_USER_REPO_SUCCESS,
      payload: {
        data: cached.repos,
        id,
      },
    })
    return
  }

  try {
    const res = yield getUserProfile(id)
    yield put({
      type: actionTypes.FETCH_USER_INFO_SUCCESS,
      payload: { data: res.data, id },
    })
    const repos = yield getUserRepos(id)
    yield put({
      type: actionTypes.FETCH_USER_REPO_SUCCESS,
      payload: {
        data: repos.data.map((d: any) =>
          pick(d, 'name', 'forks_count', 'stargazers_count', 'html_url')
        ),
        id,
      },
    })
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_USER_INFO_FAILURE,
      payload: error,
    })
  }
}
/**
 * User Sagas
 */
export default function* root() {
  yield all([
    takeLatest(actionTypes.FETCH_USERS_REQUEST as any, fetchUsers),
    takeLatest(actionTypes.FETCH_USER_INFO_REQUEST as any, fetchUserInfo),
  ])
}
