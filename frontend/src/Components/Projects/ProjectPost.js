import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProgramIcons from '../ProgramIcons.js'
import MessageForm from '../Messages/MessageForm.js'

const PostContainer = styled.article`
  width: 100%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 5px;
  padding: 1em;
  padding-bottom: .5em;
  margin: 2em 0;
  position: relative;
  display: flex;
  flex-direction: column;

  & a {
    text-decoration: none;
    &:visited {
    color: blue;
    }
  }

  & p {
    margin: 1em;
  }

  & .poster {
    font-size: .8em;
    position: absolute;
    top: 0px;
    left: 0px;
    font-weight: bold;
    padding: .5em;
    padding-bottom: 0;
    margin-left: .5em;
    display: flex;
    align-items: center;
  }

  & h2 {
    font-size: 1.3em;
    margin-top: 2em;
  }

  & .tags {
    display: flex;
  }

  & h3 {
    font-size: .8em;
    font-weight: bold;
  }

  .date {
    position: absolute;
    top: .5em;
    right: .5em;
    font-size: .8em;
    font-weight: bold;
    color: gray;
  }
`

const ProjectPost = ({ header, poster, post, posterType, tags, email, date, id, project_id }) => {

  let tagsArr
  
  if(tags.length > 0) {
    if(/,/g.test(tags)) {
    tagsArr = tags.split(',')
    } else {
    tagsArr = tags.split()
    }
  } else {
    tags = null
  }

  return (
    <PostContainer>
      <h2>{header}</h2>
      <div className='poster'>
        <a href={`mailto:${email}`}>
          <FontAwesomeIcon
            icon={['far', 'envelope']}
          />
          <span> {poster}</span>
        </a>
        <ProgramIcons
          program={posterType}
          width='30px'
        />
      </div>
      <span className="date">{new Date(date).toLocaleDateString('sv')}</span>
      <p>{post}</p>
      <h3>Releventa utbildningar:</h3>
      <div className="tags">
        {tagsArr.map(tag => (
          <ProgramIcons
            program={tag}
            width='25px'
            key={tag}
          />
        ))}
      </div>
      <MessageForm to={id} project_id={project_id} />
    </PostContainer>
  )
}

export default ProjectPost
