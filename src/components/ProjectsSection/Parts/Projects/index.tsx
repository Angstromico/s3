import React from 'react'
import { type ProjectInfo } from '@/types'
import { useFunctions } from '@/hooks'
import { useBearStore } from '@/store'

interface ProjectsInfo {
  projectInfo: ProjectInfo[]
}

const Projects = ({ projectInfo }: ProjectsInfo) => {
  const { generateImgSrc } = useFunctions()
  const { lang } = useBearStore()

  return (
    <div className='ProjectsGrid'>
      {projectInfo.map((Info, i: number) => {
        const { title, images, titulo } = Info
        const firstImg = generateImgSrc(images.data[0].attributes.url)

        return (
          <div className='card' key={i}>
            <div className='centerTitle'>
              <h3>{lang === 'en' ? title : titulo}</h3>
            </div>
            <img src={firstImg} />
          </div>
        )
      })}
    </div>
  )
}

export default Projects
