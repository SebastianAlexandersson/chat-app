import styled from 'styled-components'

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
`

const TextInput = styled.input`
  border: 1px solid gray;
  border-color: ${props => props.valid === true ? 'green' : props.value.length <= 0 ? 'gray' : 'red'};
  padding: 1em;
  margin: 1em 0;
  width: ${props => props.halfWidth ? '49%' : '100%'};
  font-size: 1em;
  &:focus {
    outline: ${props => props.value.length <= 0 ? '1px solid blue' : 'none'};
  }
`
export default TextInput