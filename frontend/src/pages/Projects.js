import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Container from '../Components/Container.js'
import ProjectSubmitForm from '../Components/Projects/ProjectSubmitForm.js'
import { ToggleButton } from '../Components/Buttons.js'
import ProjectPost from '../Components/Projects/ProjectPost.js'
import * as actions from '../store/actions/projects.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../Components/Spinner.js'
import Message from '../Components/Message.js'

const Projects = ({ projects, dispatch }) => {

  useEffect(() => {
    dispatch(actions.getProjects())
    return () => {
      dispatch(actions.reset())
    }
  }, [dispatch])

  return (
    <Container>
      <h1>Studentprojekt</h1>
      <ToggleButton 
        onClick={() => dispatch(actions.toggleForm())}
        maxWidth='600px'
      >
        <FontAwesomeIcon icon={['fas', 'bars']} className='icon' />
        Skapa nytt projekt
      </ToggleButton>
      {projects.isLoading && <Spinner />}
      {projects.isError && <Message msg='Något gick fel...' error={projects.isError} />}
      {projects.formIsShowing && <ProjectSubmitForm />}
      {projects.projects.map(project => {
        return (
          <ProjectPost
            header={ project.headline }
            poster={ `${project.first_name} ${project.last_name}` }
            post={ project.text_body }
            posterType={ project.program }
            tags={ project.tags }
            email={ project.email }
            id={ project.userid }
            key={ project.project_id }
            date={ project.created_on }
            project_id={ project.project_id }
          />
        )
      })}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
  }
}

export default connect(mapStateToProps)(Projects)
