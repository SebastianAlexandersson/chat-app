import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import { createGlobalStyle } from 'styled-components'

import Navbar from './Components/Navbar/Navbar.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Projects from './pages/Projects.js'
import UserMessages from './pages/UserMessages.js'
import Register from './pages/Register.js'

import { Provider } from 'react-redux'
import store from './store/index.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSpinner,
  faExclamationCircle,
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import {
  faUser,
  faCommentAlt,
  faPencilAlt,
  faKey,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import { URL } from './utils'

library.add(
  faEnvelope,
  faSpinner,
  faExclamationCircle,
  faCheckCircle,
  faUser,
  faCommentAlt,
  faPencilAlt,
  faKey,
  faBars,
  )

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
          <Route exact path={`${URL}/`}>
            <Home />
          </Route>
          <Route path={`${URL}/login`}>
            <Login />
          </Route>
          <Route path={`${URL}/register`}>
            <Register />
          </Route>
          <Route path={`${URL}/projects`}>
            <Projects />
          </Route>
          <Route path={`${URL}/usermessages`}>
            <UserMessages />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
