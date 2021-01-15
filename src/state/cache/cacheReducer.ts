import * as types from './../users/usersActionTypes'
import produce from 'immer'
import { set } from 'lodash'
import { get } from 'lodash/fp'

const initialState = {
  search: { '': [] },
  users: {},
}

export const getUserSearchFromCache = (query: string) => {
  return get(`cache.search.${query}`)
}
export const getUserInfoFromCache = (id: string) => {
  return get(`cache.users.${id}`)
}

export default produce((state, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      set(state.search, action.payload.query, action.payload.data)
      break

    case types.FETCH_USER_INFO_SUCCESS:
      set(state.users, `${action.payload.id}.userInfo`, action.payload.data)
      break
    case types.FETCH_USER_REPO_SUCCESS:
      set(state.users, `${action.payload.id}.repos`, action.payload.data)
      break

    default:
      break
  }
}, initialState)
