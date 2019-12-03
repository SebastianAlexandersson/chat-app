import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledInput = styled.input`
  padding: 1em;
  border: 1px solid;
  border-color: ${props => props.isValid === 1 ? 'green' : props.isValid === null ? 'gray' : 'red'};
  width: 100%;
  font-size: 1em;
  border-radius: 3px;
  padding-left: 3em;

  &:focus {
    outline: ${props => props.isValid === null ? '1px solid blue' : 'none'};
  }
`

const InputContainer = styled.div`
  position: relative;
  width: ${props => props.halfWidth ? '49%' : '100%'};
  margin: ${props => props.halfWidth ? '0' : '1.5em 0'};
`

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  color: ${props => props.isValid === null ? 'black' : props.isValid ? 'green' : 'red'};
  font-size: .8em;
  font-weight: bold;
  transform: translateY(-100%);
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  bottom: 50%;
  transform: translateY(50%);
  left: 0;
  color: ${props => props.isvalid === null ? 'gray' : props.isvalid ? 'green' : 'red'};
  margin-left: .5em;
  font-size: 1.5em;
`

const TextField = (props) => {
  return (
    <InputContainer halfWidth={props.halfWidth}>
      <StyledInput
        isValid={props.valid}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        type={props.type || 'text'}
        name={props.name}
        placeholder={props.placeholder}
      />
      <Label
        isValid={props.valid}
        labelText={props.labelText}
        errorText={props.errorText}
      >
        {props.valid === null && props.labelText}
        {props.valid === false && props.errorText}
      </Label>
      {props.icon && 
        <StyledFontAwesomeIcon
          icon={props.icon}
          isvalid={props.valid}
        />
      }
    </InputContainer>
  )
}

export default TextField
