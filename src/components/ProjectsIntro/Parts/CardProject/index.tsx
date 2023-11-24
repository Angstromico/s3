import React, { useState } from 'react'
import { type TextContent } from '@/types'
import { type ProjectInfo } from '@/types'
import ModalCard from '../ModalCard'
import { useBearStore } from '@/store'

export interface CardProject extends TextContent {
  img: string
  w?: 'firstTwo' | 'secondTwo'
  modal: ProjectInfo
}

const CardProject = ({ title, img, w, modal }: CardProject) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const { lang } = useBearStore()

  const {
    date,
    fecha,
    images,
    direction,
    direccion,
    coordinates,
    size,
    scope,
    alcance,
    credits,
    creditos,
    content,
    contenido,
  } = modal

  return (
    <>
      <div className={`card ${w ? w : ''}`} onClick={() => setShowModal(true)}>
        <div className='labelTitle'>
          <h3>{title}</h3>
        </div>
        <img src={img} />
      </div>
      {showModal && (
        <ModalCard
          title={title}
          date={lang === 'en' ? date : fecha}
          images={images}
          direction={lang === 'en' ? direction : direccion}
          coordinates={coordinates}
          size={size}
          scope={lang === 'en' ? scope : alcance}
          content={lang === 'en' ? content : contenido}
          credits={lang === 'en' ? credits : creditos}
          onClose={closeModal}
        />
      )}
    </>
  )
}

export default CardProject
