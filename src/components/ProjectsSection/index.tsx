import React, { useState, useEffect } from 'react'
import {
  type TextContent,
  type ProjectInfo,
  type ProjectsAttributes,
} from '@/types'
import ProjectsText from './Parts/ProjectsText'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS_INFO } from '@/queries'
import { useProjectsCallbacks } from './useProjectsCallbacks'
import Projects from './Parts/Projects'
import GoToPageBtn from '../GoToPageBtn'

const ProjectsSection = ({ title, content }: TextContent) => {
  const { loading, error, data } = useQuery(GET_PROJECTS_INFO)
  const [projectsInfo, setProjectsInfo] = useState<ProjectInfo[]>([])
  let info: ProjectsAttributes[]
  const { reverseLastThree } = useProjectsCallbacks(setProjectsInfo)

  useEffect(() => {
    if (!loading) reverseLastThree(info)
  }, [loading, info, reverseLastThree])

  if (loading) return
  if (error) return <h2 className='text-center'>Error...</h2>

  info = data.projects.data

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <div className='ProjectsSection'>
        <ProjectsText title={title} />
        <Projects projectInfo={projectsInfo} />
      </div>
      <GoToPageBtn mt='mt-24' link={'/portafolio'} content={content} />
    </div>
  )
}

export default ProjectsSection
