import { combineReducers } from 'redux'

import notifications from './notifications'
import login from './login'

export default combineReducers({
  notifications,
  login
})