import React, { useEffect } from 'react'
import styled from 'styled-components'
import LinkList from './LinkList.js'
import NavLink from './NavLink.js'
import NavButton from './NavButton.js'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import debounce, { URL } from '../../utils.js'
import { submitLogout, sessionGetUserInfo } from '../../store/actions/login.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Nav = styled.nav`
  width: 100%;
  background-color: blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;
  & .userinfo {
    color: #fff;
    font-size: .8em;
  }

  & .icon {
    margin-left: .5em;
    font-size: 2em;
    transform: translateY(20%);
    color: #fff;
  }

  & .icon-wrapper {
    position: relative;
    display: inline;
    cursor: pointer;

    span {
      padding: .3em 0.4em;
      background-color: red;
      color: #fff;
      border-radius: 50%;
      z-index: 1;
      font-size: .8em;
      position: absolute;
      top: -4px;
      right: 7px;
      font-weight: bold;
    }
  }
`

const Navbar = ({ login, dispatch }) => {

  const history = useHistory()

  useEffect(() => {
    dispatch(sessionGetUserInfo())
  }, [dispatch])

  const userLogin = () => history.push(URL + '/login')
  const userLogout = () => {
    dispatch(submitLogout())
    history.push(URL + '/')
  }
  const userRegister = () => history.push(URL + '/register')
  const userMessages = () => history.push(URL + '/usermessages')

  return (
    <Nav>
      <LinkList>
        <NavLink to='/' name='Hem' />
        <NavLink to='/projects' name='Projekt' />
      </LinkList>
      <div>
        {login.isLoggedIn && <>
        <span className='userinfo'>
           {`${login.session_firstname} ${login.session_lastname}`}
        </span>
        <div className="icon-wrapper" onClick={() => userMessages()}>
          <FontAwesomeIcon icon={['fas', 'comment-alt']} className='icon' />
        </div>
        </>}
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
