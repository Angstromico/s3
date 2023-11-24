import React from 'react'
import styleModal from '../../../styleModal.module.scss'
import { type Children } from '@/types'

export interface ModalContainer {
  children: Children
}

const ModalContainer = ({ children }: ModalContainer) => {
  return (
    <div className={styleModal.modalCard} id='box'>
      <div className={styleModal.modalContainer}>{children}</div>
    </div>
  )
}

export default ModalContainer
