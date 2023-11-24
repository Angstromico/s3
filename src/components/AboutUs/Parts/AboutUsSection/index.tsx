import React from 'react'
import { useFunctions } from '@/hooks'
import WhiteParagraphs from '../WhiteParagraphs'
import { type MainInfoAbout } from '../..'

const AboutUsSection = ({ aboutInfo }: MainInfoAbout) => {
  const { generateImgSrc } = useFunctions()
  const { bgImg, title, firstContent, secondContent, bottomTitle } = aboutInfo

  return (
    <div className='AboutUsContainer'>
      <div
        className='imgCover'
        style={{ backgroundImage: `url(${generateImgSrc(bgImg)})` }}
      ></div>
      <div className='gradientCover'></div>
      <h2 className='title'>{title}</h2>
      <div className='goldenBar'></div>
      <WhiteParagraphs firstP={firstContent} secondP={secondContent} />
      <div className='epilogue'>{bottomTitle}</div>
    </div>
  )
}

export default AboutUsSection
