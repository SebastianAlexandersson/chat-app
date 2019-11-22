const initalState = {
    emailIsValid: null,
    firstnameIsValid: null,
    lastnameIsValid: null,
    passwordIsValid: null,
    passwordconfirmIsValid: null,
  }

  const validateReducer = (state = initalState, action) => {
    switch(action.type) {
      case 'validate-email': {
        return {
          ...state,
          emailIsValid: action.isValid
        }
      }
      case 'validate-name': {
        return {
          ...state,
          [action.field + 'IsValid']: action.isValid
        }
      }
      case 'validate-password': {
        return {
          ...state,
          passwordIsValid: action.isValid
        }
      }
      case 'validate-passwordconfirm': {
        return {
          ...state,
          passwordconfirmIsValid: action.isValid
        }
      }
      case 'validate-reset': {
        return {
          ...state,
          emailIsValid: null,
          firstnameIsValid: null,
          lastnameIsValid: null,
          passwordIsValid: null,
          passwordconfirmIsValid: null,
        }
      }
      default:
        break
    }
    return state
  }

export default validateReducer