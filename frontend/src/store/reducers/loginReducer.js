const initialState = {
  username: '',
  password: '',
  isLoading: false
}

const loginReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'login-loading': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'login-input': {
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case 'login-success': {
      return {
        ...state,
        username: '',
        password: '',
        isLoading: false
      }
    }
    case 'login-error': {
      return {
        ...state,
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