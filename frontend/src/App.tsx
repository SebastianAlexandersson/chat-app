import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Navbar from './components/Navbar/Navbar'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  #root {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    flex-direction: column;
  }
`

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
    </>
  )
}

export default App
