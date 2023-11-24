import React from 'react'
import { type TextContent } from '@/types'
import style from './style.module.scss'
import TitleProjects from './Parts/TitleProjects'
import { useFunctions } from '@/hooks'

const AboutProject = ({ title, content, otherContent }: TextContent) => {
  const { splitIntoParagraphs } = useFunctions()

  return (
    <div className={style.AboutProjects}>
      <TitleProjects title={title} />
      <p>{content}</p>
      {splitIntoParagraphs(otherContent)}
    </div>
  )
}

export default AboutProject
