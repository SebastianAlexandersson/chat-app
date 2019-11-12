import React from 'react'
import styled from 'styled-components'

const StyledNavLink = styled.a`
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  padding: 2em;
  &:hover {
    opacity: .7;
  }
`

interface Props {
  to: string,
  name: string
}

const NavLink: React.FC<Props> = ({to, name}) => {
  
  return (
    <StyledNavLink href={to}>{name}</StyledNavLink>
  )
}

export default NavLink
