import React, { useEffect } from 'react'
import TextField from '../Components/Form/TextField.js'
import SubmitButton from '../Components/Form/SubmitButton.js'
import FormContainer from '../Components/Form/FormContainer.js'
import ProgramRadioButton from '../Components/Form/ProgramRadioButton.js'
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

  const handleRadioButtonChange = e => {
    dispatch(actions.program(e.target.name))
  }

  return (
    <FormContainer maxWidth='600px'>
      <h1>Registrering</h1>
      <Message error={register.isError} success={register.isSuccess} msg={register.msg} />
      <form onSubmit={handleSubmit}>
        <TextField 
          name='email'
          onChange={handleChange}
          value={register.email}
          valid={register.emailIsValid}
          onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          labelText='E-post'
          errorText='Ange giltlig e-postadress som slutar på @iths.se'
          icon={['far', 'envelope']}
        />
        <div className="half-width-container">
          <TextField 
            name='firstname'
            onChange={handleChange}
            value={register.firstname}
            valid={register.firstnameIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
            labelText='Förnamn'
            errorText='Endast bokstäver'
            halfWidth={true}
            icon={['fas', 'pencil-alt']}
          />
          <TextField 
            name='lastname'
            onChange={handleChange}
            value={register.lastname}
            valid={register.lastnameIsValid}
            onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
            labelText='Efternamn'
            errorText='Endast bokstäver'
            halfWidth={true}
            icon={['fas', 'pencil-alt']}
          />
        </div>
        <TextField
          name='password'
          type='password'
          onChange={handleChange}
          value={register.password}
          valid={register.passwordIsValid}
          onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          labelText='Lösenord'
          errorText='Minst 8 tecken'
          icon={['fas', 'key']}
        />
        <TextField
          name='passwordconfirm'
          type='password'
          onChange={handleChange}
          value={register.passwordconfirm}
          valid={register.passwordconfirmIsValid}
          onBlur={e => dispatch(actions.validateInput({ name: e.target.name, value: e.target.value }))}
          labelText='Bekräfta lösenord'
          errorText='Lösenord måste matcha'
          icon={['fas', 'check-circle']}
        />
        <fieldset className="fieldset">
          <span>Vilken utbildning går du på?</span>
          <ProgramRadioButton
            name='javascript'
            checked={register.program}   
            value='javascript'
            onChange={handleRadioButtonChange}     
            labelText='Javascriptutvecklare'
          />
          <ProgramRadioButton
            name='appdev'
            checked={register.program}   
            value='appdev'
            onChange={handleRadioButtonChange}     
            labelText='Apputvecklare'
          />
          <ProgramRadioButton
            name='java'
            checked={register.program}   
            value='java'
            onChange={handleRadioButtonChange}     
            labelText='Javautvecklare'
          />
          <ProgramRadioButton
            name='dotnet'
            checked={register.program}   
            value='dotnet'
            onChange={handleRadioButtonChange}     
            labelText='.NET-utvecklare'
          />
          <ProgramRadioButton
            name='webbdev'
            checked={register.program}   
            value='webbdev'
            onChange={handleRadioButtonChange}     
            labelText='Webbutvecklare'
          />
          <ProgramRadioButton
            name='tester'
            checked={register.program}   
            value='tester'
            onChange={handleRadioButtonChange}     
            labelText='Mjukvarutestare'
          />
          <ProgramRadioButton
            name='projektledare'
            checked={register.program}   
            value='projektledare'
            onChange={handleRadioButtonChange}     
            labelText='IT-projektledare'
          />
        </fieldset>
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
      && state.register.programIsValid
  }

const mapStateToProps = state => {
  return {
    register: state.register,
    isFormValid: isFormValid(state)
  }
}

export default connect(mapStateToProps)(Register)
