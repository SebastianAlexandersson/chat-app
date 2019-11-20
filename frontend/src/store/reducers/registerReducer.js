const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordconfirm: '',
  isError: false,
  msg: '',
  isLoading: false,
  isSuccess: false,
}

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'register-loading': {
      return {
        ...state,
        isError: false,
        msg: '',
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
        msg: action.msg,
        isLoading: false,
        isSuccess: true
      }
    }
    case 'register-error': {
      return {
        ...state,
        isError: true,
        msg: action.msg,
        password: '',
        passwordconfirm: '',
        isLoading: false,
      }
    }
    default:
      break
  }
  return state
}

export default registerReducer