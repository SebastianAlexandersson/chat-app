import * as types from '../actionTypes/message.js'

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  msg: '',
  message: '',
  message_id: '',
  messages: [],
}

const messageReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.MESSAGE_INPUT: {
      return {
        ...state,
        message: action.message
      }
    }
    case types.MESSAGE_LOADING: {
      return {
        ...state,
        isLoading: action.state
      }
    }
    case types.MESSAGE_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        isError: false,
        isLoading: false,
        msg: 'Medelandet skickades',
        message_id: action.message_id,
      }
    }
    case types.MESSAGE_ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        msg: 'Något gick fel...',
        message_id: action.message_id,
      }
    }
    case types.MESSAGE_RESET: {
      return {
        ...state,
        message: '',
        msg: '',
        isLoading: false,
        isSuccess: false,
        isError: false,
        message_id: '',
      }
    }
    case types.MESSAGE_SET_MESSAGES: {
      return {
        ...state,
        messages: action.messages
      }
    }
    default:
      break
  }
  return state
}

export default messageReducer