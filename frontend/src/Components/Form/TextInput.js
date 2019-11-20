import styled from 'styled-components'

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  font-size: .8em;
`

const TextInput = styled.input`
  border: 1px solid gray;
  border-color: ${props => props.valid === true ? 'green' : props.valid === null ? 'none' : 'red'};
  padding: 1em;
  margin: 1em 0;
  width: 100%;
  font-size: 1em;
  &:focus {
    outline: ${props => props.valid === null ? '1px solid blue' : 'none'};
  }
`
export default TextInput