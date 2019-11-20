import React from 'react'
import styled from 'styled-components'
import TextInput, { Label } from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import InputContainer from '../Components/Form/InputContainer.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import debounce, { timeout } from '../utils.js'
import Spinner from '../Components/Spinner.js'
import Message from '../Components/Message.js'

const Header = styled.h1`
  text-align: center;
`

const Register = ({ register, validate, isFormValid, dispatch }) => {

  const {
    isError,
    msg,
    isLoading,
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
    emailIsAvaliable
  } = validate

  const history = useHistory()

  const mockRegister = (data) => {
    const { password } = data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(password === '12345678') {
          reject('error!')
        }
        resolve('success!')
      }, 3000)
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch({ type: 'register-loading'})
    try {
      await mockRegister({
        email,
        firstname,
        lastname,
        password
      })
      dispatch({ type: 'register-success', msg: 'Success!' })
      dispatch({ type: 'validate-reset' })
    } catch(error) {
      console.log(error)
      dispatch({ type: 'register-error', msg: 'Error!' })
    }
  }

  const mockCheckIfEmailTaken = email => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(email === 'sebbe@iths.se') {
          resolve('success!')
        } else {
          reject('email is taken')
        }
      }, 2000);
    })
  }

  const validateEmail = async (email, blur = false) => {
    const isValid = /^\w+@iths.se$/i.test(email)
    if(email.length === 0) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-email', isValid: null })
    } else if(blur) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-email', isValid: isValid })
    } else {
      debounce(2000, () => {
        dispatch({ type: 'validate-email', isValid: isValid })
        dispatch({ type: 'validate-email-is-avaliable', value: true })
      })
    }
    dispatch({ type: 'register-input', field: 'email', value: email })
    if(isValid) {
      try {
        await mockCheckIfEmailTaken(email)
        dispatch({ type: 'validate-email-is-avaliable', value: true })
      } catch(error) {
        clearTimeout(timeout)
        dispatch({ type: 'validate-email-is-avaliable', value: false })
        dispatch({ type: 'validate-email', isValid: false })
      }
    }
  }

  const validateName = (name, field, blur = false) => {
    const isValid = /^[a-z]+$/i.test(name)
    if(name.length === 0) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-name', isValid: null, field: field })
    } else if(blur) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-name', isValid: isValid, field: field })
    } else {
      debounce(2000, () => dispatch({ type: 'validate-name', isValid: isValid, field: field }))
    }
    dispatch({ type: 'register-input', field: field, value: name })
  }

  const validatePassword = (pass, blur = false) => {
    const isValid = /^([a-zA-Z0-9@*#]{8,15})$/.test(pass)
    if(pass.length === 0) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-password', isValid: null })
    } else if(blur) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-password', isValid: isValid })
    } else {
      debounce(2000, () => dispatch({ type: 'validate-password', isValid: isValid }))
    }
    dispatch({ type: 'register-input', field: 'password', value: pass })
  }

  const confirmPassword = pass => {
    const isValid = pass === password
    if(pass.length === 0) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-passwordconfirm', isValid: null})
    } else if(pass.length >= 8) {
      debounce(500, () => dispatch({ type: 'validate-passwordconfirm', isValid: isValid}))
    }
    dispatch({ type: 'register-input', field: 'passwordconfirm', value: pass})
  }

  return (
    <FormContainer>
      <Header>Registrering</Header>
      <Message error={isError} success={isSuccess} msg={msg} />
      <form 
        onSubmit={handleSubmit}
      >
        <InputContainer>
          <TextInput
            name='email'
            type='text'
            placeholder='E-mail'
            onChange={e => validateEmail(e.currentTarget.value)}
            value={email}
            valid={emailIsValid}
            onBlur={e => validateEmail(e.currentTarget.value, true)}
          />
          {!emailIsValid && emailIsAvaliable && emailIsValid !== null && <Label htmlFor='email'>Ange giltlig e-postadress som slutar på @iths.se</Label>}
          {!emailIsAvaliable && !emailIsValid && emailIsValid !== null && <Label htmlFor='email'>E-mail är redan registrerad</Label>}
        </InputContainer>
        <InputContainer>
          <InputContainer halfWidth>
            <TextInput
              name='firstname'
              type='text'
              placeholder='Förnamn'
              onChange={e => validateName(e.currentTarget.value, 'firstname')}
              value={firstname}
              valid={firstnameIsValid}
              onBlur={e => validateName(e.currentTarget.value, 'firstname', true)}
            />
            {!firstnameIsValid && firstnameIsValid !== null &&
            <Label htmlFor='firstname'>Endast bokstäver</Label>}
          </InputContainer>
          <InputContainer halfWidth>
            <TextInput
              name='lastname'
              type='text'
              placeholder='Efternamn'
              onChange={e => validateName(e.currentTarget.value, 'lastname')}
              value={lastname}
              valid={lastnameIsValid}
              onBlur={e => validateName(e.currentTarget.value, 'lastname', true)}
            />
            {!lastnameIsValid && lastnameIsValid !== null &&
            <Label htmlFor='lastname'>Endast bokstäver</Label>}
          </InputContainer>
        </InputContainer>
        <InputContainer>
          <TextInput
            name='password'
            type='password'
            placeholder='Lösenord'
            onChange={e => validatePassword(e.currentTarget.value)}
            value={password}
            valid={passwordIsValid}
            onBlur={e => validatePassword(e.currentTarget.value, true)}
          />
          {!passwordIsValid && passwordIsValid !== null &&
          <Label htmlFor='password'>8-15 tecken</Label>}
        </InputContainer>
        <InputContainer>
          <TextInput
            name='passwordconfirm'
            type='password'
            placeholder='Bekräfta lösenord'
            onChange={e => confirmPassword(e.currentTarget.value)}
            value={passwordconfirm}
            valid={passwordconfirmIsValid}
          />
          {!passwordconfirmIsValid && passwordconfirmIsValid !== null &&
          <Label htmlFor='password'>Lösenord måste matcha</Label>}
        </InputContainer>
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
