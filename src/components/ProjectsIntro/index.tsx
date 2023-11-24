import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PROJECTS_INFO } from '@/queries'
import ProjectsText from '../ProjectsSection/Parts/ProjectsText'
import {
  type TextContent,
  type OptionProject,
  type ProjectInfo,
  type ProjectsAttributes,
} from '@/types'
import IntroProjects from './Parts/IntroProjects'
import { useProjectsFunctions } from './Parts/Projectsfunctions'
import Showprojects from './Parts/ShowProjects'

interface ProjectsIntro extends TextContent {
  option: OptionProject[]
}

export interface ProjectsFormat {
  first?: {
    content: ProjectInfo | null
  }
  second?: {
    firstContent: ProjectInfo | null
    secondContent: ProjectInfo | null
  }
  third?: {
    firstContent: ProjectInfo | null
    secondContent: ProjectInfo | null
    thirdContent?: ProjectInfo | null
  }
}

export type FormatArray = ProjectsFormat[]

export interface ProjectsArrs {
  all: FormatArray
  residential: FormatArray
  industrial: FormatArray
  educational: FormatArray
}

const ProjectsIntro = ({ title, option }: ProjectsIntro) => {
  const { loading, error, data } = useQuery(GET_PROJECTS_INFO)
  const [chosen, setChosen] = useState(0)
  const [projecstArrs, setProjectsArrs] = useState<ProjectsArrs>({
    all: [],
    residential: [],
    industrial: [],
    educational: [],
  })
  const [showProjects, setShowProjects] = useState<FormatArray>(
    projecstArrs.all
  )
  let projects: ProjectsAttributes[]
  const { getProjectsInfo, choseOne } = useProjectsFunctions(
    setProjectsArrs,
    setShowProjects
  )

  useEffect(() => {
    if (!loading) {
      getProjectsInfo(projects)
    }
  }, [loading, projects])

  if (loading) return
  if (error) return

  projects = data.projects.data

  return (
    <div className='ProjectsSection intro'>
      <ProjectsText title={title} />
      <IntroProjects
        option={option}
        chosen={chosen}
        setChosen={setChosen}
        choseOne={choseOne}
        projecstArrs={projecstArrs}
        setShowProjects={setShowProjects}
      />
      <Showprojects showProjects={showProjects} />
    </div>
  )
}

export default ProjectsIntro
