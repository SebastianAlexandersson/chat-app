import { combineReducers } from 'redux'
import loginReducer from './loginReducer.js'
import registerReducer from './registerReducer.js'
import projectReducer from './projectReducer.js'
import projectpostReducer from './projectpostReducer.js'
import messageReducer from './messageReducer.js'

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  projects: projectReducer,
  projectpost: projectpostReducer,
  message: messageReducer,
})

export default rootReducer