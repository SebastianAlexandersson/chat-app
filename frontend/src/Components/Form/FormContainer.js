import styled from 'styled-components'

const FormContainer = styled.section`
  margin: auto;
  width: 100%;
  max-width: ${props => props.maxWidth};
  padding: 2em 1.5em;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  background-color: #fff;
  & .inputContainer {
    display: flex;
    position: relative;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }

  & h1 {
    text-align: center;
  }
`

export default FormContainer