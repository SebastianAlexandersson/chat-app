import React, { useEffect } from 'react'
import styled from 'styled-components'
import Container from '../Components/Container.js'
import { connect } from 'react-redux'
import { getMessages } from '../store/actions/message.js'

const Messages = styled.div`
  display: flex;
`

const UserMessages = ({ messagestate, dispatch }) => {

  useEffect(() => {
    dispatch(getMessages())
  }, [dispatch])

  let id = 0

  return (
    <Container>
      {!messagestate.messages.length > 0 && 'Inga medelanden'}
      {messagestate.messages.length > 0 &&
        messagestate.messages.map(message => (
        <Messages key={id++}>
          Från: <a href={'mailto:' + message.email}>{`${message.first_name} ${message.last_name}`}</a>
          {message.message_body}
        </Messages>
      ))}
    </Container>
  )
}

const mapStateToProps = state => ({
  messagestate: state.message
})

export default connect(mapStateToProps)(UserMessages)


