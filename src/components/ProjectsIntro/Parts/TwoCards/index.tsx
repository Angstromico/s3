import React from 'react'
import { type CardProject } from '../CardProject'
import Card from '../CardProject'
import { type ProjectInfo } from '@/types'
import { useBearStore } from '@/store'

export interface TwoCards extends CardProject {
  secondTitle: string
  secondImg: string
  otherModal: ProjectInfo
  segundoTitulo: string
}

const TwoCards = ({
  title,
  titulo,
  img,
  secondTitle,
  segundoTitulo,
  secondImg,
  modal,
  otherModal,
}: TwoCards) => {
  const { lang } = useBearStore()

  return (
    <div className='twoCards'>
      <Card
        title={lang === 'en' ? title : titulo}
        img={img}
        w='firstTwo'
        modal={modal}
      />
      <Card
        title={lang === 'en' ? secondTitle : segundoTitulo}
        img={secondImg}
        w='secondTwo'
        modal={otherModal}
      />
    </div>
  )
}

export default TwoCards
