import React from 'react'
import styled from 'styled-components'
import appdevLogo from '../img/applicationsutvecklare.png'
import dotnetLogo from '../img/dotnet.png'
import frontendLogo from '../img/frontendutvecklare.png'
import itprojektledareLogo from '../img/it-projektledare.png'
import javascriptLogo from '../img/javascriptutvecklare.png'
import javaLogo from '../img/javautvecklare.png'
import mjukvarutestLogo from '../img/mjukvarutestare.png'
import webbutvecklingLogo from '../img/webbutvecklare.png'

const LogoContainer = styled.div`
  width: ${props => props.width};
`

const ProgramIcons = ({ program, width }) => {

  const programs = {
    appdev: {
      src: appdevLogo,
      alt: 'Apputvecklare'
    },
    dotnet: {
      src: dotnetLogo,
      alt: '.NET-utvecklare'
    },
    javascript: {
      src: javascriptLogo,
      alt: 'Javascriptutvecklare'
    },
    java: {
      src: javaLogo,
      alt: 'Javautvecklare'
    },
    tester: {
      src: mjukvarutestLogo,
      alt: 'Mjukvarutestare'
    },
    webbdev: {
      src: webbutvecklingLogo,
      alt: 'Webbutvecklare'
    },
    frontend: {
      src: frontendLogo,
      alt: 'Frontendutvecklare'
    },
    projektledare: {
      src: itprojektledareLogo,
      alt: 'IT-projektledare'
    },
  }

  const getImgSrc = program => programs[program]

  const imgSrc = getImgSrc(program)

  return (
    <LogoContainer width={width}>
      <img src={imgSrc.src} style={{width: '100%', height: 'auto', display: 'block'}} alt={imgSrc.alt} />
    </LogoContainer>
  )
}

export default ProgramIcons
