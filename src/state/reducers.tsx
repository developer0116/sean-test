import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import users from './users/usersReducer'
import cache from './cache/cacheReducer'

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    users,
    cache,
  })
export default createRootReducer
