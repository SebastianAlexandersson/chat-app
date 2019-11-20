const initialState = {
  username: null,
  password: null,
  isLoggedIn: false,
  isError: false,
  errorMsg: '',
  isLoading: false
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'login-loading': {
      return {
        ...state,
        isError: false,
        errorMsg: null,
        isLoading: true
      }
    }
    case 'login-input': {
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case 'login-logout': {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    case 'login-success': {
      return {
        ...state,
        isLoggedIn: true,
        username: '',
        password: '',
        isError: false,
        errorMsg: '',
        isLoading: false
      }
    }
    case 'login-error': {
      return {
        ...state,
        isError: true,
        errorMsg: action.msg,
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