import React from 'react'
import AboutUsSection from './Parts/AboutUsSection'
import { type NumbersInfo } from './Parts/NumbersSection'
import { type ImageStrapi } from '@/types'
import NumbersSection from './Parts/NumbersSection'
import LogoAboutUs from './Parts/LogoAboutUs'

interface AboutInfo {
  bgImg: string
  title: string
  firstContent: string
  secondContent: string
  bottomTitle: string
}
export interface MainInfoAbout {
  aboutInfo: AboutInfo
  numbersInfo?: NumbersInfo[]
  logoTitle?: string
  logo?: ImageStrapi
}

const AboutUs = ({
  aboutInfo,
  numbersInfo,
  logoTitle,
  logo,
}: MainInfoAbout) => {
  return (
    <div id='sobrenosotros' className='mainContainerAboutUs'>
      <AboutUsSection aboutInfo={aboutInfo} />
      <div className='numbersContainer'>
        {numbersInfo.map((numberInfo: NumbersInfo, i: number) => {
          const { title, number, type } = numberInfo

          return (
            <NumbersSection key={i} title={title} type={type} number={number} />
          )
        })}
      </div>
      <LogoAboutUs title={logoTitle} logo={logo} />
    </div>
  )
}

export default AboutUs
