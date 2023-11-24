import React from 'react'
import { type Children } from '@/types'

interface ContainerLogo {
  children: Children
  title: string
}

const logoContainer = ({ children, title }: ContainerLogo) => {
  return (
    <div className='logoContainer'>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export default logoContainer
