import React from 'react'
import { type TextContent } from '@/types'
import style from '../../style.module.scss'

const TitleProjects = ({ title }: TextContent) => {
  return (
    <div className={style.titleSection}>
      <div className={style.goldenBar}></div>
      <h2>{title}</h2>
    </div>
  )
}

export default TitleProjects
