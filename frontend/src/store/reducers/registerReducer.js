import {
  REGISTER_ERROR,
  REGISTER_SUBMIT,
  REGISTER_INPUT,
  REGISTER_SUCCESS,
  REGISTER_VALIDATE,
  REGISTER_ERROR_EMAIL_TAKEN,
  REGISTER_RESET,
} from '../actionTypes/register.js'

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordconfirm:'',
  firstnameIsValid: null,
  lastnameIsValid: null,
  emailIsValid: null,
  passwordIsValid: null,
  passwordconfirmIsValid: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  msg: '',
}

const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_SUBMIT: {
      return {
        ...state,
        isLoading: true
      }
    }
    case REGISTER_INPUT: {
      return {
        ...state,
        [action.field.name]: action.field.value
      }
    }
    case REGISTER_VALIDATE: {
      return {
        ...state,
        [action.field.name + 'IsValid']: action.field.isValid
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordconfirm: '',
        firstnameIsValid: null,
        lastnameIsValid: null,
        emailIsValid: null,
        passwordIsValid: null,
        passwordconfirmIsValid: null,
        isLoading: false,
        isSuccess: true,
        msg: 'Registrering lyckades. Ett mail har skickats till din e-mailadress. Följ länken för att verifiera ditt konto.'
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordconfirm: '',
        firstnameIsValid: null,
        lastnameIsValid: null,
        emailIsValid: null,
        passwordIsValid: null,
        passwordconfirmIsValid: null,
        isLoading: false,
        isSuccess: false,
        isError: true,
        msg: 'Nånting gick fel...'
      }
    }
    case REGISTER_ERROR_EMAIL_TAKEN: {
      return {
        ...state,
        email: '',
        password: '',
        passwordconfirm: '',
        emailIsValid: null,
        passwordIsValid: null,
        passwordconfirmIsValid: null,
        isLoading: false,
        isSuccess: false,
        isError: true,
        msg: 'E-postadress är redan registrerad.'
      }
    }
    case REGISTER_RESET: {
      return {
        ...state,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordconfirm: '',
        firstnameIsValid: null,
        lastnameIsValid: null,
        emailIsValid: null,
        passwordIsValid: null,
        passwordconfirmIsValid: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        msg: '',
      }
    }
    default:
      break
  }
  return state
}

export default registerReducer