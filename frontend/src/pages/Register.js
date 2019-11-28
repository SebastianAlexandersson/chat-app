import React, { useEffect } from 'react'
import TextField, { Label } from '../Components/Form/TextField.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import { connect } from 'react-redux'
import debounce, { timeout } from '../utils.js'
import Message from '../Components/Message.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from '../store/actions/register.js'

const Register = ({ register, isFormValid, dispatch }) => {

  useEffect(() => {
    return () => {
      dispatch(actions.reset())
      clearTimeout(timeout)
    }
  }, [dispatch])

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(actions.submitRegistration())
  }

  const handleChange = e => {
    const { name, value } = e.target
    dispatch(actions.input({ name, value }))
    debounce(1000, () => dispatch(actions.validateInput({ name, value })))
  }

  return (
    <FormContainer maxWidth='600px'>
      <h1>Registrering</h1>
      <Message error={register.isError} success={register.isSuccess} msg={register.msg} />
      <form 
        onSubmit={handleSubmit}
      >
        <div className="inputContainer">
          <TextField
            name='email'
            placeholder='E-post'
            onChange={handleChange}
            value={register.email}
            valid={register.emailIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          />
          {!register.emailIsValid && register.emailIsValid !== null && <Label htmlFor='email'>Ange giltlig e-postadress som slutar på @iths.se</Label>}
        </div>
        <div className="inputContainer">
          <TextField
            name='firstname'
            placeholder='Förnamn'
            halfWidth={true}
            onChange={handleChange}
            value={register.firstname}
            valid={register.firstnameIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          />
          {!register.firstnameIsValid && register.firstnameIsValid !== null &&
          <Label htmlFor='firstname'>Endast bokstäver</Label>}
          <TextField
            name='lastname'
            placeholder='Efternamn'
            halfWidth={true}
            onChange={handleChange}
            value={register.lastname}
            valid={register.lastnameIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          />
          {!register.lastnameIsValid && register.lastnameIsValid !== null &&
          <Label htmlFor='lastname'>Endast bokstäver</Label>}
        </div>
        <div className="inputContainer">
          <TextField
            name='password'
            type='password'
            placeholder='Lösenord'
            onChange={handleChange}
            value={register.password}
            valid={register.passwordIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          />
          {!register.passwordIsValid && register.passwordIsValid !== null &&
          <Label htmlFor='password'>Minst 8 tecken</Label>}
        </div>
        <div className="inputContainer">
          <TextField
            name='passwordconfirm'
            type='password'
            placeholder='Bekräfta lösenord'
            onChange={handleChange}
            value={register.passwordconfirm}
            valid={register.passwordconfirmIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          />
          {!register.passwordconfirmIsValid && register.passwordconfirmIsValid !== null &&
          <Label htmlFor='password'>Lösenord måste matcha</Label>}
        </div>
        <SubmitButton
          type='submit'
          disabled={register.isLoading || !isFormValid }
        >
          {register.isLoading ? <><FontAwesomeIcon icon={['fas', 'spinner']} spin /> Registrera</> : 'Registrera'}
        </SubmitButton>
      </form>
    </FormContainer>
  )
}

const isFormValid = state => {
    return state.register.emailIsValid
      && state.register.firstnameIsValid
      && state.register.lastnameIsValid
      && state.register.passwordIsValid
      && state.register.passwordconfirmIsValid
  }

const mapStateToProps = state => {
  return {
    register: state.register,
    isFormValid: isFormValid(state)
  }
}

export default connect(mapStateToProps)(Register)
