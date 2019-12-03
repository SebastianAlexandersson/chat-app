import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import FormContainer from '../Form/FormContainer.js'
import TextField from '../Form/TextField.js'
import TextArea from '../Form/TextArea.js'
import SubmitButton from '../Form/SubmitButton.js'
import ProgramCheckBox from '../Form/ProgramCheckBox.js'
import * as actions from '../../store/actions/projectpost.js'
import { toggleForm, getProjects } from '../../store/actions/projects.js'
import Spinner from '../Spinner.js'
import Message from '../Message'

const Container = styled.div`
  margin: 1em 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1.5em 0;
  position: relative;
`

const Header = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  font-weight: bold;
  font-size: 0.8em;
  color: black;
`

const ProjectSubmitForm = ({ projectPost, dispatch }) => {

  const {
    javascript,
    appdev,
    webbdev,
    java,
    dotnet,
    tester,
    projektledare,
    frontend,
    isLoading,
    isError,
    headline,
    textBody,
    isSuccess,
    msg
  } = projectPost

  const strings = ['javascript', 'appdev', 'webbdev', 'java', 'dotnet', 'projektledare', 'tester', 'frontend']

  let tags = [javascript, appdev, webbdev, java, dotnet, projektledare, tester, frontend]
    .map((tag, index) => tag ? tag = strings[index] : null)
    .filter(Boolean)
  
  const handleSubmit = async e => {
    e.preventDefault()

    try {

      dispatch(actions.loading(true))
      await dispatch(actions.submitProject({ headline, textBody, tags }))
      dispatch(actions.success())
      
      setTimeout(() => {
        dispatch(actions.reset())
        dispatch(toggleForm())
        dispatch(getProjects())
      }, 2000)

    } catch(err) {
      console.log(err)
      dispatch(actions.error())
    }
  }

  const handleChange = e => {
    dispatch(actions.input({ name: e.target.name, value: e.target.value }))
  }

  const handleCheckboxChange = e => {
    dispatch(actions.checkbox(e.target.name))
  }

  return (
    <FormContainer maxWidth='600px'>
      {isLoading && <Spinner />}
      <Message msg={msg} error={isError} success={isSuccess} />
      <form onSubmit={handleSubmit}>
        <TextField
          name='headline'
          onChange={handleChange}
          value={projectPost.headline}
          valid={null}
          labelText='Rubrik'
          icon={['fas', 'pencil-alt']}
        />
        <TextArea
          value={projectPost.textBody}
          labelText='Beskriv ditt projekt'
          onChange={handleChange}
          icon={['fas', 'pencil-alt']}
          height={'10em'}
          name='textBody'
        />
        <Container>
          <Header>Markera dom ubildningar som är relevanta för ditt projekt</Header>
          <ProgramCheckBox
            checked={projectPost.javascript}
            onChange={handleCheckboxChange}
            program='javascript'
            name='javascript'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.dotnet}
            onChange={handleCheckboxChange}
            program='dotnet'
            name='dotnet'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.java}
            onChange={handleCheckboxChange}
            program='java'
            name='java'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.frontend}
            onChange={handleCheckboxChange}
            program='frontend'
            name='frontend'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.projektledare}
            onChange={handleCheckboxChange}
            program='projektledare'
            name='projektledare'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.appdev}
            onChange={handleCheckboxChange}
            program='appdev'
            name='appdev'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.webbdev}
            onChange={handleCheckboxChange}
            program='webbdev'
            name='webbdev'
            width='30px'
          />
          <ProgramCheckBox
            checked={projectPost.tester}
            onChange={handleCheckboxChange}
            program='tester'
            name='tester'
            width='30px'
          />
        </Container>
        <SubmitButton>
          Skapa projekt
        </SubmitButton>
      </form>
    </FormContainer>
  )
}

const mapStateToProps = state => ({
  projectPost: state.projectpost,
  project: state.project,
})

export default connect(mapStateToProps)(ProjectSubmitForm)
