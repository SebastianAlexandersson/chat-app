import React from 'react'
import styled from 'styled-components'
import { InfoButton } from '../Buttons.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledHeader = styled.h2`
  font-size: 1.3em;
  margin-top: 2em;
`

const StyledPoster = styled.span`
  font-size: .8em;
  position: absolute;
  top: 0px;
  left: 0px;
  font-weight: bold;
  padding: .5em;
  padding-bottom: 0;
  margin-left: .5em;
`

const StyledPost = styled.p`
  margin: 1em;
`

const PostContainer = styled.article`
  width: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 5px;
  padding: 1em;
  margin: 2em 0;
  position: relative;
`

const PosterLink = styled.a`
  text-decoration: none;
  &:visited {
    color: blue;
  }
`

const ProjectPost = ({header, poster, post, posterType}) => {
  return (
    <PostContainer>
      <StyledHeader>{header}</StyledHeader>
      <StyledPoster>
        <PosterLink href="#">
          <FontAwesomeIcon
            icon={['far', 'envelope']}
          />
          <span> {poster}</span>
        </PosterLink>
        <span> - </span> 
        <FontAwesomeIcon
          icon={['fab', 'js-square']}
          color='black'
          mask={['fas', 'square']}
          transform='grow-1'
          style={{background: 'yellow'}}
        /> 
        <span> {posterType}</span>
      </StyledPoster>
      <StyledPost>{post}</StyledPost>
      <InfoButton>Svara</InfoButton>
    </PostContainer>
  )
}

export default ProjectPost
