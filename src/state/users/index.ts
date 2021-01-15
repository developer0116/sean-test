import * as usersActions from './usersActions'
import * as usersReducers from './usersReducer'
import * as usersSagas from './usersSagas'

export default {
  ...usersActions,
  ...usersReducers,
  ...usersSagas,
}
