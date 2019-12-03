import {
  PROJECT_GET_ALL,
  PROJECT_LOADING,
  PROJECT_ERROR,
  PROJECT_RESET,
  PROJECT_TOGGLE_FORM,
} from '../actionTypes/projects.js'

const initialState = {
  projects: [],
  isLoading: false,
  formIsShowing: false,
}

const projectReducer = (state = initialState, action) => {
  switch(action.type) {
    case PROJECT_GET_ALL: {
      return {
        ...state,
        projects: action.projects
      }
    }
    case PROJECT_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading
      }
    }
    case PROJECT_ERROR: {
      return {
        ...state,
        isError: action.isError
      }
    }
    case PROJECT_RESET: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        projects: []
      }
    }
    case PROJECT_TOGGLE_FORM: {
      return {
        ...state,
        formIsShowing: !state.formIsShowing
      }
    }
    default:
      break
  }
  return state
}

export default projectReducer