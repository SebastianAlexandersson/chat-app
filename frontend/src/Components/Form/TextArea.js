import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledTextArea = styled.textarea`
  width: 100%;
  height: ${props => props.height};
  border: 1px solid gray;
  padding: 1em;
  font-size: 1em;
  border-radius: 3px;
  padding-left: 3em;
  font-family: 'Roboto', 'sans-serif';
`
const InputContainer = styled.div`
  position: relative;
`

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  font-size: .8em;
  font-weight: bold;
  transform: translateY(-100%);
`

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  transform: translateY(50%);
  left: 0;
  color: gray;
  margin-left: .5em;
  font-size: 1.5em;
`

const TextArea = (props) => {
  return (
    <InputContainer>
      <StyledTextArea
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        name={props.name}
        height={props.height}
      />
      <Label
        labelText={props.labelText}
      >
        {props.labelText}
      </Label>
      {props.icon && 
        <StyledFontAwesomeIcon
          icon={props.icon}
        />
      }
    </InputContainer>
  )
}

export default TextArea
