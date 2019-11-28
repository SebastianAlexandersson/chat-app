import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  padding: 1em;
  border: 1px solid;
  border-color: ${props => props.isValid === true ? 'green' : props.isValid === null ? 'none' : 'red'};
  margin: 1em 0;
  width: ${props => props.halfWidth ? '49%' : '100%'};
  font-size: 1em;
  &:focus {
    outline: ${props => props.isValid === null ? '1px solid blue' : 'none'};
  }
`

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  font-size: .8em;
`

const TextField = (props) => {
  return (
    <StyledInput
      isValid={props.valid}
      onChange={props.onChange}
      onBlur={props.onBlur}
      value={props.value}
      type={props.type || 'text'}
      name={props.name}
      placeholder={props.placeholder}
      halfWidth={props.halfWidth}
    />
  )
}

export default TextField
