import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledNavLink = styled(Link)`
  color: #fff;
  padding: 1em;
  text-decoration: none;
  font-weight: bold;
  &:visited {
    text-decoration: none;
    color: #fff;
  }
  &:hover {
    color: lightgray;
  }
`

const NavLink = ({ to, name }) => {
  const href = '/studentprojekt' + to
  return (
    <StyledNavLink to={href}>{name}</StyledNavLink>
  )
}

export default NavLink
