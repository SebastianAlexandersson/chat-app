import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import registerReducer from './registerReducer.js'
import validateReducer from './validateReducer.js'
import messageReducer from './messageReducer.js'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  validate: validateReducer,
  message: messageReducer
})

export default rootReducer