import styled from 'styled-components'

const SubmitButton = styled.button`
  width: 100%;
  border: none;
  padding: 1em 2em;
  font-weight: bold;
  color: #fff;
  outline: none;
  background-color: ${props => props.disabled ? 'darkblue' : 'blue'};
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
`

export default SubmitButton