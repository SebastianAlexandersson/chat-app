import React, { useEffect } from 'react'
import TextInput from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Message from '../Components/Message.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { API_HOST } from '../utils.js'

const Login = ({ login, message, dispatch }) => {
  const {
    username,
    password,
    isLoading,
  } = login

  const {
    isError,
    isSuccess,
    msg
  } = message

  const history = useHistory()

  useEffect(() => {
    return () => {
      dispatch({ type: 'message-reset' })
      dispatch({ type: 'register-reset' })
      dispatch({ type: 'validate-reset' })
    }
  }, [dispatch])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch( { type: 'message-reset' })
      dispatch({ type: 'login-loading', value: true })
      const res = await fetch(`${API_HOST}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
      })
      if(res.status === 200) {
        dispatch({ type: 'message-success', msg: 'Inloggning lyckades.' })
        dispatch({ type: 'login-success' })
        dispatch({ type: 'message-login' })
        setTimeout(() => {
          history.push('/')
          dispatch({ type: 'message-reset' })
        }, 1000)
        return
      } else if(res.status === 401) {
        dispatch({ type: 'login-error' })
        dispatch({ type: 'message-error', msg: 'Felaktigt användarnamn eller lösenord.'})
        return
      } else if(res.status === 400) {
        dispatch({ type: 'login-error' })
        dispatch({ type: 'message-error', msg: 'Saknas användarnamn och/eller lösenord.'})
        return
      } else {
        throw Error
      }
    } catch(error) {
      dispatch({ type: 'login-error' })
      dispatch({ type: 'message-error', msg: 'Nånting gick fel...' })
    }
  }

  return (
    <FormContainer>
      <h1 style={{ textAlign: 'center' }}>Logga in TEST</h1>
      <Message
        error={isError}
        success={isSuccess}
        msg={msg}
      />
      <form action='#' onSubmit={handleSubmit}>
        <TextInput
        name='username'
        type='text'
        placeholder='Användarnamn'
        onChange={e => dispatch({ type: 'login-input', field: 'username', value: e.currentTarget.value })}
        value={username}
        noValidation={true}
      />
      <TextInput
        name='password'
        type='password'
        placeholder='Lösenord'
        onChange={e => dispatch({ type: 'login-input', field: 'password', value: e.currentTarget.value })}
        value={password}
        noValidation={true}
      />
      <SubmitButton
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? <><FontAwesomeIcon icon={['fas', 'spinner']} spin /> Logga in</> : 'Logga in'}
      </SubmitButton>
      </form>
    </FormContainer>
  )
}

const mapStateToProps = state => {
  return {
    login: state.login,
    message: state.message
  }
}

export default connect(mapStateToProps)(Login)
