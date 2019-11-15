import React from 'react'
import styled from 'styled-components'
import LinkList from './LinkList.js'
import NavLink from './NavLink.js'

const Nav = styled.nav`
  width: 100%;
  background-color: blue;
  margin-bottom: 1em;
`

const Navbar = () => {
  return (
    <Nav>
      <LinkList>
        <NavLink to='/' name='Home' />
        <NavLink to='/about' name='About' />
        <NavLink to='/login' name='Login' />
      </LinkList>
    </Nav>
  )
}

export default Navbar
