import {
  LOGIN_INPUT,
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_LOGOUT,
  LOGIN_RESET
} from '../actionTypes/login.js'

const initialState = {
  username: '',
  password: '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  msg: '',
  isLoggedIn: false
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }
    case LOGIN_INPUT: {
      return {
        ...state,
        [action.name]: action.value
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        username: '',
        password: '',
        isLoading: false,
        isError: false,
        isSuccess: true,
        msg: action.msg,
        isLoggedIn: true
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        password: '',
        isLoading: false,
        isError: true,
        isSuccess: false,
        msg: action.msg
      }
    }
    case LOGIN_SUBMIT: {
      return {
        ...state,
        isLoading: true
      }
    }
    case LOGIN_LOGOUT: {
      return {
        ...state,
        isLoggedIn: false
      }
    }
    case LOGIN_RESET: {
      return {
        ...state,
        isSuccess: false,
        isError: false,
        msg: '',
        username: '',
        password: '',
        isLoading: false
      }
    }
    default:
      break
  }
  return state
}

export default loginReducer