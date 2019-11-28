import React from 'react'
import styled from 'styled-components'
import LinkList from './LinkList.js'
import NavLink from './NavLink.js'
import NavButton from './NavButton.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { URL, HOST } from '../../utils.js'
import { logout } from '../../store/actions/login.js'

const Nav = styled.nav`
  width: 100%;
  background-color: blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
`

const Navbar = ({ login, dispatch }) => {
  const history = useHistory()

  const userLogin = () => history.push(URL + '/login')
  const userLogout = async () => {
    try {
      const res = await fetch(`${HOST}/api/logout`)
      console.log(await res.status)
      dispatch(logout())
    } catch(error) {
      console.log(error)
    }
  }
  const userRegister = () => history.push(URL + '/register')

  return (
    <Nav>
      <LinkList>
        <NavLink to='/' name='Hem' />
        <NavLink to='/about' name='Om' />
      </LinkList>
      <div>
        {!login.isLoggedIn && <NavButton onClick={userRegister}>Registrera</NavButton>}
        <NavButton
        onClick={login.isLoggedIn ? userLogout : userLogin}
      >
        {login.isLoggedIn ? 'Logga ut' : 'Logga in'}
      </NavButton>
      </div>
    </Nav>
  )
}

const mapStateToProps = state => ({ login: state.login })

export default connect(mapStateToProps)(Navbar)
