import * as types from '../actionTypes/register.js'
import { HOST } from '../../utils.js'

export const input = field => ({
  type: types.REGISTER_INPUT,
  field
})

export const validate = field => ({
  type: types.REGISTER_VALIDATE,
  field
})

export const reset = () => ({ type: types.REGISTER_RESET })

export const validateInput = field => (dispatch, getState) => {

  if(field.value.length === 0) {
    return dispatch({ type: types.REGISTER_VALIDATE, field: { name: field.name, isValid: null }})
  }

  switch(field.name) {
    case 'email':
      const emailIsValid = /^[\w.]+@iths.se$/i.test(field.value)
      return dispatch({ type: types.REGISTER_VALIDATE, field: { name: 'email', isValid: emailIsValid }})
    case 'firstname':
      const firstnameIsValid = /^[a-z]+$/i.test(field.value)
      return dispatch({ type: types.REGISTER_VALIDATE, field: { name: 'firstname', isValid: firstnameIsValid }})
    case 'lastname':
      const lastnameIsValid = /^[a-z]+$/i.test(field.value)
      return dispatch({ type: types.REGISTER_VALIDATE, field: { name: 'lastname', isValid: lastnameIsValid }})
    case 'password':
      const passwordIsValid = /.{8,}/.test(field.value)
      return dispatch({ type: types.REGISTER_VALIDATE, field: { name: 'password', isValid: passwordIsValid }})
    case 'passwordconfirm':
      const passwordconfirmIsValid = field.value === getState().register.password
      return dispatch({ type: types.REGISTER_VALIDATE, field: { name: 'passwordconfirm', isValid: passwordconfirmIsValid }})
    default:
      return
  }
} 

export const submitRegistration = () => async (dispatch, getState) => {

  const {
    email,
    firstname,
    lastname,
    password,
    passwordconfirm
  } = getState().register

  dispatch({ type: types.REGISTER_SUBMIT })

  try {
    const res = await fetch(`${HOST}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email , firstname, lastname, password, passwordconfirm })
    })

    if(res.status !== 200) {
      throw Error(res.status)
    }
    dispatch({ type: types.REGISTER_SUCCESS })
  } catch(error) {
    if(Number(error.message) === 401) {
      dispatch({ type: types.REGISTER_ERROR_EMAIL_TAKEN })
    } else {
      dispatch({ type: types.REGISTER_ERROR })
    }
    
  }
}