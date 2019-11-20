import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const colorOne = 'white'

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  
  border-top: 2px solid ${colorOne};
  border-right: 2px solid ${colorOne};
  border-bottom: 2px solid ${colorOne};
  border-left: 7px solid ${colorOne};
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin: auto;
`;

export default Spinner