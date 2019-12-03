import styled from 'styled-components'

const FormContainer = styled.section`
  margin: auto;
  width: 100%;
  max-width: ${props => props.maxWidth};
  padding: 2em 1.5em;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  background-color: #fff;
  border-radius: 10px;

  & h1 {
    text-align: center;
  }

  & .half-width-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  & .fieldset {
    border: none;
    padding: 2em 0;
    margin: none;
    position: relative;

    & span {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 0.8em;
      font-weight: bold;
    }
  }
`

export default FormContainer