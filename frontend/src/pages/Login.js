import React, { useEffect } from 'react'
import TextField from '../Components/Form/TextField.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Message from '../Components/Message.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../store/actions/login.js'
import { URL } from '../utils.js'

const Login = ({ login, dispatch }) => {
  const {
    username,
    password,
    isLoading,
    isError,
    isSuccess,
    msg
  } = login

  useEffect(() => {
    return () => {
      dispatch(actions.reset())
    }
  }, [dispatch])

  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(actions.submitLogin(username, password))
    .then(() => history.push('/' + URL))
    .catch(err => err)
  }

  const handleChange = e => {
    dispatch(actions.input({ name: e.target.name, value: e.target.value }))
  }

  return (
    <FormContainer maxWidth='600px'>
      <h1>Logga in</h1>
      <Message
        error={isError}
        success={isSuccess}
        msg={msg}
      />
      <form action='#' onSubmit={handleSubmit}>
        <TextField
          name='username'
          type='text'
          labelText='Användarnamn'
          onChange={handleChange}
          value={username}
          valid={null}
          icon={['fas', 'user']}
        />
      <TextField
        name='password'
        type='password'
        labelText='Lösenord'
        onChange={handleChange}
        value={password}
        valid={null}
        icon={['fas', 'key']}
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
  }
}

export default connect(mapStateToProps)(Login)
