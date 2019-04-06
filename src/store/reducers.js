import { combineReducers } from 'redux'

import userReducer from './user'
import headerReducer from './header'
import subscribeReducer from './subscribe'
import viewReducer from './view'

export default combineReducers({
  user: userReducer,
  header: headerReducer,
  subscribe: subscribeReducer,
  view: viewReducer
})
