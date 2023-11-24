import React from 'react'
import { type ImageStrapi } from '@/types'
import { useFunctions } from '@/hooks'

interface Logos {
  logo: ImageStrapi
}

const Logos = ({ logo }: Logos) => {
  const { generateImgSrc } = useFunctions()
  const { url, alternativeText } = logo.data.attributes
  const imgUrl = generateImgSrc(url)

  return (
    <div className='logos'>
      <div className='plus'>+</div>
      <img src={imgUrl} alt={alternativeText} />
    </div>
  )
}

export default Logos
