import styled from 'styled-components'

export const InfoButton = styled.button`
  padding: 1em 2em;
  background-color: blue;
  border: none;
  font-weight: bold;
  font-size: .8em;
  color: #fff;
  cursor: pointer;
  margin-right: .5em;
  margin-left: auto;
  border-radius: 5px;
`

export const ToggleButton = styled.button`
  position: relative;
  display: block;
  padding: 1em 2em;
  background-color: blue;
  border: none;
  font-weight: bold;
  font-size: 1em;
  color: #fff;
  cursor: pointer;
  margin: auto;
  width: 100%;
  max-width: ${props => props.maxWidth ? props.maxWidth : 'none'};
  border-radius: 5px;

  & .icon {
    position: absolute;
    left: 3%;
    font-size: 1.3em;
  }
`

