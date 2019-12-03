import * as types from '../actionTypes/projects.js'
import { HOST } from '../../utils.js'

export const setProjects = projects => ({
  type: types.PROJECT_GET_ALL,
  projects
})

export const loading = state => ({
  type: types.PROJECT_LOADING,
  isLoading: state
})

export const error = state => ({
  type: types.PROJECT_ERROR,
  isError: state
})

export const reset = () => ({
  type: types.PROJECT_RESET
})

export const toggleForm = () => ({
  type: types.PROJECT_TOGGLE_FORM
})

export const getProjects = () => async dispatch => {

  dispatch(loading(true))

  try {

    const res = await fetch(`${HOST}/api/getprojects`)
    const projects = await res.json()

    dispatch(setProjects(projects))
    dispatch(loading(false))

  } catch {
    dispatch(error())
  }
}