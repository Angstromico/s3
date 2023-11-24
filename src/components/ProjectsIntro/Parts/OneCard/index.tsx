import React from 'react'
import { type CardProject } from '../CardProject'
import Card from '../CardProject'
import { useBearStore } from '@/store'

const OneCard = ({ title, img, modal, titulo }: CardProject) => {
  const { lang } = useBearStore()

  return (
    <div className='singleCard'>
      <Card title={lang === 'en' ? title : titulo} img={img} modal={modal} />
    </div>
  )
}

export default OneCard
