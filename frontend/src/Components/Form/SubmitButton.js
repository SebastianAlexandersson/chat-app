import styled from 'styled-components'

const SubmitButton = styled.button`
  width: 100%;
  border: none;
  padding: 1em 2em;
  font-weight: bold;
  color: ${props => props.disabled ? 'lightgray' : '#fff'};
  outline: none;
  background-color: ${props => props.disabled ? 'gray' : 'blue'};
  font-size: 1em;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'wait' : 'pointer'};
`

export default SubmitButton