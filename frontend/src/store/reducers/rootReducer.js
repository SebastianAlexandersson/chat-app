import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import registerReducer from './registerReducer.js'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
})

export default rootReducer