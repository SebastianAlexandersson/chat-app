import * as types from '../actionTypes/projectpost.js'

const initialState = {
  javascript: false,
  appdev: false,
  webbdev: false,
  java: false,
  dotnet: false,
  tester: false,
  projektledare: false,
  isLoading: false,
  isError: false,
  headline: '',
  textBody: '',
  msg: '',
  isSuccess: false,
}

const projectpostReducer = (state = initialState, action) => {
  switch(action.type) {
    case types.INPUT: {
      return {
        ...state,
        [action.name]: action.value
      }
    }
    case types.CHECKBOX: {
      return {
        ...state,
        [action.name]: !state[action.name]
      }
    }
    case types.LOADING: {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }
    case types.ERROR: {
      return {
        ...state,
        isError: true,
        isSuccess: false,
        isLoading: false,
        msg: 'Något gick fel..'
      }
    }
    case types.SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        isError: false,
        isLoading: false,
        msg: 'Ditt projekt är tillagt.'
      }
    }
    case types.RESET: {
      return {
        ...state,
        javascript: false,
        appdev: false,
        webbdev: false,
        java: false,
        dotnet: false,
        tester: false,
        projektledare: false,
        isLoading: false,
        isError: false,
        isSuccess: false,
        headline: '',
        textBody: '',
        msg: '',
      }
    }
    default:
      break
  }
  return state
}

export default projectpostReducer