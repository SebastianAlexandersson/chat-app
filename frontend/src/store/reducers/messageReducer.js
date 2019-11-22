const initialState = {
  isError: false,
  isLoggedIn: false,
  isSuccess: false,
  msg: '',
}

const messageReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'message-error': {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        msg: action.msg
      }
    }
    case 'message-success': {
      return {
        ...state,
        isSuccess: true,
        isError: false,
        msg: action.msg
      }
    }
    case 'message-login': {
      return {
        ...state,
        isLoggedIn: true
      }
    }
    case 'message-logout': {
      return {
        ...state,
        isLoggedIn: false
      }
    }
    case 'message-reset': {
      return {
        ...state,
        isError: false,
        isSuccess: false,
        msg: ''
      }
    }
    default:
      break
  }
  return state
}

export default messageReducer