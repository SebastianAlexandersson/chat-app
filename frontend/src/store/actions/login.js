import * as types from '../actionTypes/login.js'
import { HOST } from '../../utils.js'

export const input = field => ({
  type: types.LOGIN_INPUT,
  name: field.name,
  value: field.value
})

export const success = msg => ({
  type: types.LOGIN_SUCCESS,
  msg
})

export const error = msg => ({
  type: types.LOGIN_ERROR,
  msg
})

export const loading = state => ({
  type: types.LOGIN_LOADING,
  isLoading: state
})

export const logout = () => ({
  type: types.LOGIN_LOGOUT,
})

export const reset = () => ({
  type: types.LOGIN_RESET
})

export const submitLogin = (username, password) => async dispatch => {
  dispatch(loading(true))

  try {
    const res = await fetch(`${HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
    
    if(res.status !== 200) {
      throw Error(res.status)
    }

    dispatch(success('Inloggning lyckades.'))

  } catch(err) {
    if(Number(err.message) === 401) {
      dispatch(error('Felaktigt användarnamn eller lösenord.'))
    } else {
      dispatch(error('Nånting gick fel...'))
    }
    throw Error(err)
  }
}
