import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import TextInput, { Label } from '../Components/Form/TextInput.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import InputContainer from '../Components/Form/InputContainer.js'
import { connect } from 'react-redux'
import debounce, { timeout } from '../utils.js'
import Message from '../Components/Message.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { API_HOST, HOST } from '../utils.js'

const Header = styled.h1`
  text-align: center;
`

const Register = 
  ({ 
    register,
    validate, 
    message,
    isFormValid,
    dispatch 
  }) => {

  const {
    isLoading,
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

  const {
    isError,
    isSuccess,
    msg,
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
    dispatch({ type: 'register-loading', value: true})
    try {
       const res = await fetch(`${API_HOST}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, firstname, lastname, password, passwordconfirm })
      })
      if(res.status !== 200) {
        throw Error(res.status)
      }
      dispatch({ type: 'message-success', msg: 'Registrering lyckades.' })
      dispatch({ type: 'register-reset' })
      dispatch({ type: 'validate-reset' })
      debounce(1000, () => history.push(HOST + '/'))
      } catch(error) {
        if(Number(error.message) === 400) {
          dispatch({ type: 'message-error', msg: 'Validering misslyckades.' })
          dispatch({ type: 'register-reset '})
          dispatch({ type: 'validate-reset '})
        } else if(Number(error.message) === 401) {
          dispatch({ type: 'message-error', msg: 'E-mail är redan registrerad.' })
          dispatch({ type: 'register-input', field: 'email', value: '' })
          dispatch({ type: 'register-input', field: 'password', value: '' })
          dispatch({ type: 'register-input', field: 'passwordconfirm', value: '' })
          dispatch({ type: 'validate-email', isValid: null })
          dispatch({ type: 'validate-password', isValid: null })
          dispatch({ type: 'validate-passwordconfirm', isValid: null })
          dispatch({ type: 'register-loading', value: false })
        } else if(Number(error.message) === 500) {
          dispatch({ type: 'message-error', msg: 'Något gick fel med servern...' })
          dispatch({ type: 'register-reset '})
          dispatch({ type: 'validate-reset '})
        } else {
          dispatch({ type: 'message-error', msg: 'Något gick fel... någonstans...' })
          dispatch({ type: 'register-reset '})
          dispatch({ type: 'validate-reset '})
        }
      }
  }

  const validateEmail = async (email, blur = false) => {
    const isValid = /^\w+@iths.se$/i.test(email)
    dispatch({ type: 'register-input', field: 'email', value: email })
    if(email.length === 0) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-email', isValid: null })
    } else if(blur) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-email', isValid: isValid })
    } else {
      debounce(1000, () => {
        dispatch({ type: 'validate-email', isValid: isValid })
      })
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
      debounce(1000, () => dispatch({ type: 'validate-name', isValid: isValid, field: field }))
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
      debounce(1000, () => dispatch({ type: 'validate-password', isValid: isValid }))
    }
    dispatch({ type: 'register-input', field: 'password', value: pass })
  }

  const confirmPassword = pass => {
    const isValid = pass === password
    if(pass.length === 0) {
      clearTimeout(timeout)
      dispatch({ type: 'validate-passwordconfirm', isValid: null })
    } else if(pass.length >= 8) {
      debounce(500, () => dispatch({ type: 'validate-passwordconfirm', isValid: isValid }))
    }
    dispatch({ type: 'register-input', field: 'passwordconfirm', value: pass })
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
          {!emailIsValid && emailIsValid !== null && <Label htmlFor='email'>Ange giltlig e-postadress som slutar på @iths.se</Label>}
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
          {isLoading ? <><FontAwesomeIcon icon={['fas', 'spinner']} /> Registrera</> : 'Registrera'}
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
    message: state.message,
    isFormValid: isFormValid(state)
  }
}

export default connect(mapStateToProps)(Register)
