import React from 'react'
import styled from 'styled-components'
import ProgramIcons from '../ProgramIcons.js'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1em;
  margin: .5em 0;


`

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: .8em;
  margin-left: 1em;
`

const ProgramRadioButton = (props) => {
  return (
    <Container>
      <input
        type='radio'
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        checked={props.checked === props.name}
      >
      </input>
        <ProgramIcons
          program={props.name}
          width='30px'
        />
      <Label>
        {props.labelText}
      </Label>
    </Container>
  )
}

export default ProgramRadioButton
