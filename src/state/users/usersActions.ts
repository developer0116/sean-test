// @flow
/**
 * @module Users/usersActions
 * @desc Users Actions
 */
import * as ActionTypes from './usersActionTypes'

export const fetchUsers = (query: string) => {
  return {
    type: ActionTypes.FETCH_USERS_REQUEST,
    payload: query || '',
  }
}

export const fetchUserInfo = (id: string) => {
  return {
    type: ActionTypes.FETCH_USER_INFO_REQUEST,
    payload: id,
  }
}
