import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MessageBox = styled.div`
  width: 100%;
  color: #fff;
  padding: 1em;
  background-color: ${props => props.success ? 'green' : props.error ? 'red' : 'transparent'};
  display: ${props => !props.success && !props.error ? 'none' : 'flex'};
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  span {
    margin-left: 1em;
  }
`

const Message = ({ error, success, msg }) => {
  return (
    <MessageBox
      error={error}
      success={success}
    >
      {error && <><FontAwesomeIcon icon={['fas', 'exclamation-circle']} size='2x' /><span>{msg}</span></>}
      {success && <><FontAwesomeIcon icon={['fas', 'check-circle']} size='2x' /><span>{msg}</span></>}

    </MessageBox>
  )
}

export default Message
