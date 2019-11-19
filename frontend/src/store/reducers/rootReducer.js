import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import registerReducer from './registerReducer.js'
import validateReducer from './validateReducer.js'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  validate: validateReducer
})

export default rootReducer