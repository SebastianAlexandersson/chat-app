import * as types from '../actionTypes/login.js'
import { HOST } from '../../utils.js'
import Cookies from 'js-cookie'

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

export const setSession = user => ({
  type: types.LOGIN_SET_SESSION,
  user
})

export const submitLogout = () => async dispatch => {

  try {
    const res = await fetch(`${HOST}/api/auth/logout`)

    if(res.status !== 200) {
      throw Error(res.status)
    }

    dispatch(logout())

    Cookies.remove('isloggedin')
    
  } catch(error) {
    console.log(error)
  }
}

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

    const userData = await res.json()

    dispatch(setSession(userData))
    dispatch(success('Inloggning lyckades.'))

    Cookies.set('isloggedin', true, { expires: 365 })

  } catch(err) {
    if(Number(err.message) === 401) {
      dispatch(error('Felaktigt användarnamn eller lösenord.'))
    } else {
      dispatch(error('Nånting gick fel...'))
    }
    throw Error(err)
  }
}

export const sessionGetUserInfo = () => async dispatch => {

  console.log(Cookies.get())

  if (!Cookies.get('isloggedin')) {
    return
  }

  try {
    const res = await fetch(`${HOST}/api/auth/userinfo`)

    if(res.status !== 200) {
      throw Error()
    }

    const userData = await res.json()

    dispatch(setSession(userData))

  } catch(error) {
  }
}