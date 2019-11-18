import React from 'react'
import styled from 'styled-components'
import TextInput from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Header = styled.h1`
  text-align: center;
`

const mockLogin = async ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'sebbe' && password === 'sebbe') {
        resolve('logged in !')
      } else {
        reject('error')
      }
    }, 3000);
  })
}

const Login = ({ login, dispatch }) => {
  const {
    isLoggedIn,
    isError,
    username,
    password,
    errorMsg,
    isLoading,
  } = login

  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch({type: 'login-loading'})
      await mockLogin({ username, password })
      dispatch({type: 'login-success'})
      history.push('/')
    } catch(error) {
      dispatch({type: 'login-error', msg: 'Incorrect username or password'})
    }
  }

  return (
    <FormContainer>
      <Header>Login</Header>
      {isLoggedIn && <span>Congrats!</span>}
      {isError && <span>{errorMsg}</span>}
      <form action='#' onSubmit={handleSubmit}>
        <TextInput
        name='username'
        type='text'
        placeholder='Username'
        onChange={e => dispatch({ type: 'login-input', field: 'username', value: e.currentTarget.value })}
      />
      <TextInput
        name='password'
        type='password'
        placeholder='Password'
        onChange={e => dispatch({ type: 'login-input', field: 'password', value: e.currentTarget.value })}
      />
      <SubmitButton
        type='submit'
        disabled={isLoading}
        onClick={() => console.log('click')}
      >
        {isLoading ? 'Logging in...' : 'Log in'}
      </SubmitButton>
      </form>
    </FormContainer>
  )
}

const mapStateToProps = state => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps)(Login)
