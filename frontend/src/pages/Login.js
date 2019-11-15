import React from 'react'
import styled from 'styled-components'
import TextInput from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import { connect } from 'react-redux'

const FormContainer = styled.div`
  margin: auto;
  width: 100%;
  max-width: 600px;
  padding: 2em 1.5em;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  background-color: #fff;
`

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
    }, 1000);
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

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      dispatch({type: 'loading'})
      await mockLogin({ username, password })
      dispatch({type: 'success'})
    } catch(error) {
      dispatch({type: 'error', msg: 'Incorrect username or password'})
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
        onChange={e => dispatch({ type: 'input', field: 'username', value: e.currentTarget.value })}
      />
      <TextInput
        name='password'
        type='password'
        placeholder='Password'
        onChange={e => dispatch({ type: 'input', field: 'password', value: e.currentTarget.value })}
      />
      <SubmitButton
        type='submit'
        value={isLoading ? 'Logging in...' : 'Log in'}
        disabled={isLoading}
      />
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
