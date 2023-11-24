import React from 'react'
import { type ImageStrapi } from '@/types'
import LogoContainer from './Parts/LogoContainer'
import Logos from './Parts/Logos'

interface LogoInfo {
  logo: ImageStrapi
  title: string
}

const LogoAboutUs = ({ logo, title }: LogoInfo) => {
  return (
    <LogoContainer title={title}>
      <Logos logo={logo} />
    </LogoContainer>
  )
}

export default LogoAboutUs
