const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordconfirm: '',
  isError: false,
  errorMsg: '',
  isLoading: false,
  errorType: '',
  isSuccess: false,
}

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'register-loading': {
      return {
        ...state,
        isError: false,
        errorMsg: '',
        isLoading: true
      }
    }
    case 'register-input': {
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case 'register-success': {
      return {
        ...state,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordconfirm: '',
        isError: false,
        errorMsg: '',
        isLoading: false,
        isSuccess: true
      }
    }
    case 'register-error': {
      return {
        ...state,
        isError: true,
        errorMsg: action.errorMsg,
        errorType: action.errorType
      }
    }
    default:
      break
  }
  return state
}

export default registerReducer