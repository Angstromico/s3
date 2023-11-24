import React from 'react'
import style from '../../style.module.scss'

interface Title {
  title: string
}

const TitleContainer = ({ title }: Title) => {
  return (
    <div className={style.titleContainer}>
      <div className={style.goldenBar}></div>
      <h2>{title}</h2>
    </div>
  )
}

export default TitleContainer
