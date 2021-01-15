import * as types from './usersActionTypes'
import produce from 'immer'

const initialState = {
  error: '',
  users: [],
  repos: [],
  userInfo: {},
  isRunning: false,
}
export default produce((state, action) => {
  switch (action.type) {
    case types.FETCH_USERS_REQUEST:
      state.error = ''
      state.isRunning = true
      break
    case types.FETCH_USERS_SUCCESS:
      state.error = ''
      state.users = action.payload.data
      state.isRunning = false
      break
    case types.FETCH_USERS_FAILURE:
      state.error = action.payload
      state.isRunning = false
      break
    case types.FETCH_USER_INFO_REQUEST:
      state.isRunning = true
      state.error = ''
      state.userInfo = {}
      state.repos = []
      break
    case types.FETCH_USER_INFO_SUCCESS:
      state.error = ''
      state.userInfo = action.payload.data
      state.repos = []
      break
    case types.FETCH_USER_INFO_FAILURE:
      state.userInfo = {}
      state.isRunning = false
      state.error = action.payload
      break
    case types.FETCH_USER_REPO_REQUEST:
      state.error = ''
      state.repos = []
      break
    case types.FETCH_USER_REPO_SUCCESS:
      state.error = ''
      state.isRunning = false
      state.repos = action.payload.data
      break
    case types.FETCH_USER_REPO_FAILURE:
      state.error = action.payload
      state.repos = []
      state.isRunning = false
      break

    default:
      break
  }
}, initialState)
