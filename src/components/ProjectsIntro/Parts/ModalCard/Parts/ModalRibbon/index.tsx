import React from 'react'
import styleModal from '../../styleModal.module.scss'

interface ModalRibbonProps {
  date: string
  title: string
  onClose: () => void
}

const ModalRibbon = ({ date, title, onClose }: ModalRibbonProps) => {
  return (
    <div className={styleModal.modalRibbon}>
      <h3>{date}</h3>
      <h2>{title}</h2>
      <button onClick={onClose}>X</button>
    </div>
  )
}

export default ModalRibbon
