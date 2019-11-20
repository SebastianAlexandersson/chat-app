import React from 'react'
import styled from 'styled-components'

const MessageBox = styled.div`
  width: 100%;
  color: #fff;
  padding: 1em;
  background-color: ${props => props.success ? 'lightgreen' : props.error ? 'red' : 'transparent'};
`

const Msg = styled.span`
  font-weight: bold;
`

const Message = ({ error, success, msg }) => {
  return (
    <MessageBox
      error={error}
      success={success}
    >
      <Msg>{msg}</Msg>
    </MessageBox>
  )
}

export default Message
