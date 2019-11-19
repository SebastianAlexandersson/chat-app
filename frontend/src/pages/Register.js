import React from 'react'
import styled from 'styled-components'
import TextInput, { Label } from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import HalfInputContainer from '../Components/Form/HalfInputContainer.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import debounce from '../utils.js'
import Spinner from '../Components/Spinner.js'

const Header = styled.h1`
  text-align: center;
`

const Register = ({ register, validate, isFormValid, dispatch }) => {

  const {
    isError,
    errorMsg,
    isLoading,
    errorType,
    isSuccess,
    password,
    passwordconfirm,
    firstname,
    lastname,
    email,
  } = register

  const {
    emailIsValid,
    firstnameIsValid,
    lastnameIsValid,
    passwordIsValid,
    passwordconfirmIsValid,
  } = validate

  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'register-loading'})
    try {
      fetch('http://localhost:3333/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          firstname,
          lastname,
          password,
        })
      }).then(res => dispatch({ type: 'register-success'}))
    } catch(error) {
      console.log(error)
      dispatch({ type: 'register-error' })
    }
  }

  const validateEmail = email => {
    const isValid = /^\w+@iths.se$/i.test(email)
    dispatch({ type: 'register-input', field: 'email', value: email })
    dispatch({ type: 'validate-email', isValid: isValid })
  }

  const validateName = (name, field) => {
    const isValid = /^[a-z]+$/i.test(name)
    dispatch({ type: 'register-input', field: field, value: name })
    dispatch({ type: 'validate-name', isValid: isValid, field: field })
  }

  const validatePassword = pass => {
    const isValid = /^([a-zA-Z0-9@*#]{8,15})$/.test(pass)
    dispatch({ type: 'register-input', field: 'password', value: pass })
    dispatch({ type: 'validate-password', isValid: isValid })
  }

  const confirmPassword = pass => {
    const isValid = pass === password
    dispatch({ type: 'register-input', field: 'passwordconfirm', value: pass})
    dispatch({ type: 'validate-passwordconfirm', isValid: isValid})
  }

  return (
    <FormContainer>
      <Header>Register</Header>
      {isError && <span>{errorMsg}</span>}
      <form 
        onSubmit={handleSubmit}
      >
        <HalfInputContainer>
          <TextInput
            name='email'
            type='text'
            placeholder='E-mail'
            onChange={e => validateEmail(e.currentTarget.value)}
            value={email}
            valid={emailIsValid}
          />
          <Label htmlFor='email'>TEST</Label>
        </HalfInputContainer>
        <HalfInputContainer>
          <TextInput
            name='firstname'
            type='text'
            placeholder='First name'
            onChange={e => validateName(e.currentTarget.value, 'firstname')}
            halfWidth
            value={firstname}
            valid={firstnameIsValid}
          />
          <TextInput
            name='lastname'
            type='text'
            placeholder='Last name'
            onChange={e => validateName(e.currentTarget.value, 'lastname')}
            halfWidth
            value={lastname}
            valid={lastnameIsValid}
          />
        </HalfInputContainer>
        <TextInput
          name='password'
          type='password'
          placeholder='Password'
          onChange={e => validatePassword(e.currentTarget.value)}
          value={password}
          valid={passwordIsValid}
        />
        <TextInput
          name='passwordconfirm'
          type='password'
          placeholder='Confirm password'
          onChange={e => confirmPassword(e.currentTarget.value)}
          value={passwordconfirm}
          valid={passwordconfirmIsValid}
        />
        <SubmitButton
          type='submit'
          disabled={isLoading || !isFormValid }
        >
          {isLoading ? <Spinner /> : 'Register'}
        </SubmitButton>
      </form>
    </FormContainer>
  )
}

const isFormValid = state => {
    return state.validate.emailIsValid
      && state.validate.firstnameIsValid
      && state.validate.lastnameIsValid
      && state.validate.passwordIsValid
      && state.validate.passwordconfirmIsValid
  }

const mapStateToProps = state => {
  return {
    register: state.register,
    validate: state.validate,
    isFormValid: isFormValid(state)
  }
}

export default connect(mapStateToProps)(Register)
