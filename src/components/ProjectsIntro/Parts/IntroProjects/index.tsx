import React from 'react'
import style from '../../style.module.scss'
import { type OptionProject } from '@/types'
import { type ProjectsArrs, type FormatArray } from '../..'
import { useBearStore } from '@/store'

export type title = 'All' | 'Residential' | 'Industrial' | 'Educational'
export type titulo = 'Todas' | 'Residencial' | 'Industrial' | 'Educativo'

interface IntroProject {
  option: OptionProject[]
  setChosen: (num: number) => void
  chosen: number
  choseOne: (
    i: number,
    setChosen: (i: number) => void,
    title: title | titulo,
    projecstArrs: ProjectsArrs,
    setShowProjects: (show: FormatArray) => void
  ) => void
  projecstArrs: ProjectsArrs
  setShowProjects: (show: FormatArray) => void
}

const IntroProjects = ({
  option,
  setChosen,
  chosen,
  choseOne,
  projecstArrs,
  setShowProjects,
}: IntroProject) => {
  const { lang } = useBearStore()

  return (
    <div className={style.optionsContainer}>
      {option.map((element, i: number) => {
        const { title, titulo } = element

        return (
          <div
            onClick={() =>
              choseOne(
                i,
                setChosen,
                lang === 'en' ? title : titulo,
                projecstArrs,
                setShowProjects
              )
            }
            className={`${style.option} ${chosen === i ? style.chosen : ''}`}
            key={i}
          >
            {lang === 'en' ? title : titulo}
          </div>
        )
      })}
    </div>
  )
}

export default IntroProjects
