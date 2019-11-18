import React from 'react'
import styled from 'styled-components'
import TextInput from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import HalfInputContainer from '../Components/Form/HalfInputContainer.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Header = styled.h1`
  text-align: center;
`

const Register = ({ register, dispatch }) => {
  const {
    isError,
    errorMsg,
    isLoading,
    errorType,
    isSuccess
  } = register

  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <FormContainer>
      <Header>Register</Header>
      {isError && <span>{errorMsg}</span>}
      <form action='#' onSubmit={handleSubmit}>
        <TextInput
            name='email'
            type='email'
            placeholder='E-mail'
            onChange={e => dispatch({ type: 'register-input', field: 'email', value: e.currentTarget.value })}
          />
        <HalfInputContainer>
          <TextInput
            name='firstname'
            type='text'
            placeholder='First name'
            onChange={e => dispatch({ type: 'register-input', field: 'firstname', value: e.currentTarget.value })}
            halfWidth
          />
          <TextInput
            name='lastname'
            type='text'
            placeholder='Last name'
            onChange={e => dispatch({ type: 'register-input', field: 'lastname', value: e.currentTarget.value })}
            halfWidth
          />
        </HalfInputContainer>
        <TextInput
          name='password'
          type='password'
          placeholder='Password'
          onChange={e => dispatch({ type: 'register-input', field: 'password', value: e.currentTarget.value })}
        />
        <TextInput
          name='passwordconfirm'
          type='password'
          placeholder='Confirm password'
          onChange={e => dispatch({ type: 'register-input', field: 'passwordconfirm', value: e.currentTarget.value })}
        />
        <SubmitButton
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? '...' : 'Register'}
        </SubmitButton>
      </form>
    </FormContainer>
  )
}

const mapStateToProps = state => {
  return {
    register: state.register
  }
}

export default connect(mapStateToProps)(Register)
