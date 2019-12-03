import React, { useState } from 'react'
import styled from 'styled-components'
import SubmitButton from '../Form/SubmitButton.js'
import TextArea from '../Form/TextArea.js'
import { ToggleButton } from '../Buttons.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import Message from '../Message.js'
import * as actions from '../../store/actions/message.js'

const Container = styled.div`
  width: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`

const MessageForm = ({ messagestate, to, project_id, dispatch }) => {

  const {
    isError,
    isSuccess,
    isLoading,
    message,
    msg,
    from,
    message_id
  } = messagestate

  const [ formIsShowing, toggleForm ] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      
      await dispatch(actions.submitMessage({ message, to }))
      dispatch(actions.success(project_id))

      setTimeout(() => {
        dispatch(actions.reset())
        toggleForm(false)
      }, 2000)

    } catch(err) {
      dispatch(actions.error(project_id))
    }
  }

  const handleChange = e => {
    dispatch(actions.input(e.target.value, to))
  }

  return (
    <Container>
      
      <ToggleButton onClick={() => toggleForm(prevState => !prevState)} >
        <FontAwesomeIcon icon={['fas', 'bars']} className='icon' />
        Skicka medelande
      </ToggleButton>
      {message_id === project_id}
      {formIsShowing && 
        <form onSubmit={handleSubmit}>
          <TextArea
            height='8em'
            onChange={handleChange}
            value={message}
          />
          <SubmitButton>Skicka</SubmitButton>
      </form>
      }
      
    </Container>
  )
}

const mapStateToProps = state => ({
  messagestate: state.message
})

export default connect(mapStateToProps)(MessageForm)
