import styled from 'styled-components'

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: ${props => props.halfWidth ? '49%' : '100%'};
`

export default InputContainer