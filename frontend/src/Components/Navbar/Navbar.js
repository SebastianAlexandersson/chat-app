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
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Navbar = ({ login, dispatch }) => {
  const { isLoggedIn } = login
  const history = useHistory()

  const userLogin = () => history.push('/login')
  const userLogout = () => dispatch({type: 'login-logout'})
  const userRegister = () => history.push('/register')

  return (
    <Nav>
      <LinkList>
        <NavLink to='/' name='Home' />
        <NavLink to='/about' name='About' />
      </LinkList>
      <div>
        {!isLoggedIn && <NavButton onClick={userRegister}>Register</NavButton>}
        <NavButton
        onClick={isLoggedIn ? userLogout : userLogin}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </NavButton>
      </div>
    </Nav>
  )
}

const mapStateToProps = state => ({ login: state.login })

export default connect(mapStateToProps)(Navbar)
