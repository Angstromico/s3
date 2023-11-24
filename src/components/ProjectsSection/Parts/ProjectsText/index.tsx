import React from 'react'
import { type TextContent } from '@/types'

const ProjectsText = ({ title }: TextContent) => {
  return (
    <div className='textContainer'>
      <div className='goldenBar'></div>
      <h2>{title}</h2>
    </div>
  )
}

export default ProjectsText
