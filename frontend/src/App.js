import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import { createGlobalStyle } from 'styled-components'
import Navbar from './Components/Navbar/Navbar.js'
import Home from './pages/Home.js'
import About from './pages/About.js'
import Login from './pages/Login.js'
import { Provider } from 'react-redux'
import store from './store/index.js'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: rgba(0,0,0,.03)
  }

  #root {
      width: 100vw;
      max-width: 100vw;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
`

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
