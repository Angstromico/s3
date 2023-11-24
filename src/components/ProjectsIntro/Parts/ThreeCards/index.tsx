import React from 'react'
import { type TwoCards } from '../TwoCards'
import Card from '../CardProject'
import { type ProjectInfo } from '@/types'
import { useBearStore } from '@/store'

interface ThreeCards extends TwoCards {
  thirdTitle: string
  tercerTitulo: string
  thirdImg: string
  lastModal: ProjectInfo
}

const ThreeCards = ({
  title,
  titulo,
  img,
  secondTitle,
  segundoTitulo,
  secondImg,
  thirdTitle,
  tercerTitulo,
  thirdImg,
  modal,
  otherModal,
  lastModal,
}: ThreeCards) => {
  const { lang } = useBearStore()

  return (
    <div className='threeCards'>
      <Card title={lang === 'en' ? title : titulo} img={img} modal={modal} />
      <Card
        title={lang === 'en' ? secondTitle : segundoTitulo}
        img={secondImg}
        modal={otherModal}
      />
      <Card
        title={lang === 'en' ? thirdTitle : tercerTitulo}
        img={thirdImg}
        modal={lastModal}
      />
    </div>
  )
}

export default ThreeCards
