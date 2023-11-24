import React from 'react'
import { type StepsData } from '../..'
import { useFunctions } from '@/hooks'
import style from '../../style.module.scss'

const Step = ({ steps, step, position }: StepsData) => {
  const { generateImgSrc } = useFunctions()
  const image =
    step >= 3
      ? null
      : generateImgSrc(steps[step || 0].image.data.attributes.url)
  const alt =
    step >= 3 ? null : steps[step || 0].image.data.attributes.alternativeText
  const positions = {
    first: style.step,
    last: style.secondStep,
    second: style.thirdStep,
  }

  return (
    <div className={positions[position || 'left']}>
      <div className={style.textInfo}>
        <h2>{steps[step || 0].title}</h2>
        <p>{steps[step || 0].content}</p>
      </div>
      <div className={style.stuffed}></div>
      {image !== null && <img src={image} alt={alt} />}
    </div>
  )
}

export default Step
