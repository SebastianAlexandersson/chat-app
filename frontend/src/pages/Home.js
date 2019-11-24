import React from 'react'
import Container from '../Components/Container.js'
import ProjectPost from '../Components/ProjectPost/ProjectPost.js'

const Home = () => {
  return (
    <Container>
      <h1>Studentprojekt TEST</h1>
      <ProjectPost
        header='Mitt projekt!'
        poster='Sebastian Alexandersson'
        post='Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla'
        posterType='Javascriptutveckalare'
      />
      <ProjectPost
        header='Mitt projekt!'
        poster='Sebastian Alexandersson'
        post='Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla'
        posterType='Javascriptutveckalare'
      />
      <ProjectPost
        header='Mitt projekt!'
        poster='Sebastian Alexandersson'
        post='Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla'
        posterType='Javascriptutveckalare'
      />
      <ProjectPost
        header='Mitt projekt!'
        poster='Sebastian Alexandersson'
        post='Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla Bla bla bla bla bla'
        posterType='Javascriptutveckalare'
      />
    </Container>
  )
}

export default Home
