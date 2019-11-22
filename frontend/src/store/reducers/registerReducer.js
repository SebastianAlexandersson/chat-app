const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordconfirm: '',
  msg: '',
  isLoading: false,
}

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'register-loading': {
      return {
        ...state,
        isLoading: action.value
      }
    }
    case 'register-input': {
      return {
        ...state,
        [action.field]: action.value
      }
    }
    case 'register-reset': {
      return {
        ...state,
        firstname: '',
        lastname: '',
        email: '',
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