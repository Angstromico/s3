import React from 'react'
import { type StepsInfo } from '@/pages/Page'
import style from './style.module.scss'
import Step from './Parts/Step'

export interface StepsData {
  steps: StepsInfo[]
  step?: number
  position?: 'first' | 'last' | 'second'
}

const WorkingSteps = ({ steps }: StepsData) => {
  return (
    <div id='servicios' className={style.WorkingSteps}>
      <Step steps={steps} step={0} position={'first'} />
      <Step steps={steps} step={1} position={'last'} />
      <Step steps={steps} step={2} position={'second'} />
      <Step steps={steps} step={3} position={'last'} />
    </div>
  )
}

export default WorkingSteps
