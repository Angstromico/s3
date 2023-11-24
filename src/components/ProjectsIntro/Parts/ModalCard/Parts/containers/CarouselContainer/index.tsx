import React from 'react'
import { type ModalContainer } from '../ModalContainer'
import styleModal from '../../../styleModal.module.scss'

const CarouselContainer = ({ children }: ModalContainer) => {
  return (
    <div className={styleModal.modalBox}>
      <div className={styleModal.boxContainer}>{children}</div>
    </div>
  )
}

export default CarouselContainer
