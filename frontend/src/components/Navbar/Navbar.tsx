import React from 'react'
import styled from 'styled-components'
import LinkList from './LinkList'
import NavLink from './NavLink'
import { ButtonNav } from '../Buttons'

const Nav = styled.nav`
  background-color: #1976d2;
  width: 100vw;
  display: flex;
  justify-content: space-between;
`

const Navbar: React.FC = () => {
  return (
    <Nav>
      <LinkList>
        <NavLink to='#' name='Link' />
        <NavLink to='#' name='Link' />
        <NavLink to='#' name='Link' />
      </LinkList>
      <ButtonNav>Login</ButtonNav>
    </Nav>
  )
}

export default Navbar
