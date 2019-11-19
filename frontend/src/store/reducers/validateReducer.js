const initalState = {
    emailIsValid: false,
    firstnameIsValid: false,
    lastnameIsValid: false,
    passwordIsValid: false,
    passwordconfirmIsValid: false,
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
      default:
        break
    }
    return state
  }

export default validateReducer