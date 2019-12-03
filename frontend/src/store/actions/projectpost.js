import * as types from '../actionTypes/projectpost'
import { HOST } from '../../utils.js'

export const loading = state => ({
  type: types.LOADING,
  isLoading: state
})

export const error = (state, msg) => ({
  type: types.ERROR,
  isError: state,
  msg
})

export const input = field => ({
  type: types.INPUT,
  name: field.name,
  value: field.value
})

export const checkbox = name => ({
  type: types.CHECKBOX,
  name
})

export const reset = () => ({
  type: types.RESET
})

export const success = () => ({
  type: types.SUCCESS
})

export const submitProject = data => (dispatch, getState) => {

  const userId = getState().login.session_userid

  return new Promise(async (resolve, reject) => {

    try {

      const {
        headline,
        textBody,
        tags
      } = data

      if(!headline || !textBody || tags.length < 1) {
        throw Error('Bad input')
      }

      const res = await fetch(`${HOST}/api/auth/postproject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({headline, textBody, tags, userId})
      })

      if(res.status !== 200) {
        throw Error(res.status)
      } else {
        resolve()
      }

    } catch(err) {
      reject(err)
    }
    })
}