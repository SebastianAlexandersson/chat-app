const initialState = {
  username: '',
  password: '',
  isLoggedIn: false,
  isError: false,
  errorMsg: '',
  isLoading: false
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'loading': {
      return {
        ...state,
        isError: false,
        errorMsg: '',
        isLoading: true
      }
    }
    case 'input': {
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case 'logout': {
      return {
        ...state,
        isLoggedIn: false,
      }
    }
    case 'success': {
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
    case 'error': {
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