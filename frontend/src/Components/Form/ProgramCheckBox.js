import React from 'react'
import styled from 'styled-components'
import ProgramIcons from '../ProgramIcons.js'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ProgramCheckBox = (props) => {
  return (
    <Container>
      <input
        type='checkbox'
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
      <ProgramIcons
        program={props.program}
        width={props.width}
      />
    </Container>
  )
}

export default ProgramCheckBox
