import * as types from '../actionTypes/message.js'
import { HOST } from '../../utils.js'

export const input = (message, message_id) => ({
  type: types.MESSAGE_INPUT,
  message,
  message_id
})

export const error = message_id => ({
  type: types.MESSAGE_ERROR,
  message_id
})

export const loading = state => ({
  type: types.MESSAGE_LOADING,
  isLoading: state
})

export const success = message_id => ({
  type: types.MESSAGE_SUCCESS,
  message_id
})

export const reset = () => ({
  type: types.MESSAGE_RESET,
})

export const setMessages = messages => ({
  type: types.MESSAGE_SET_MESSAGES,
  messages
})

export const submitMessage = (message) => (dispatch, getState) => {
  
  return new Promise(async (resolve, reject) => {

    message.from = getState().login.session_userid
    
    try {

      const res = await fetch(`${HOST}/api/auth/sendmessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      })

      if(res.status !== 200) {
        throw Error(res.status)
      }

      resolve()

    } catch(err) {
      reject(err)
    }
  })
}

export const getMessages = () => async dispatch => {
  try {

    const res = await fetch(`${HOST}/api/auth/getmessages`)

    if(res.status !== 200) {
      throw Error
    }

    dispatch(setMessages(await res.json()))

  } catch(err) {
    dispatch(error())
  }
}