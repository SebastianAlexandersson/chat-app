import React from 'react'
import styled from 'styled-components'
import LinkList from './LinkList.js'
import NavLink from './NavLink.js'
import NavButton from './NavButton.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Nav = styled.nav`
  width: 100%;
  background-color: blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navbar = ({ message, dispatch }) => {
  const public_url = process.env.PUBLIC_URL
  const history = useHistory()

  const userLogin = () => history.push(public_url + '/login')
  const userLogout = () => dispatch({ type: 'message-logout' })
  const userRegister = () => history.push(public_url + '/register')

  return (
    <Nav>
      <LinkList>
        <NavLink to='/' name='Hem' />
        <NavLink to='/about' name='Om' />
      </LinkList>
      <div>
        {!message.isLoggedIn && <NavButton onClick={userRegister}>Registrera</NavButton>}
        <NavButton
        onClick={message.isLoggedIn ? userLogout : userLogin}
      >
        {message.isLoggedIn ? 'Logga ut' : 'Logga in'}
      </NavButton>
      </div>
    </Nav>
  )
}

const mapStateToProps = state => ({ message: state.message })

export default connect(mapStateToProps)(Navbar)
