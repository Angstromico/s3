import React from 'react'
import WhiteParagraph from '../WhiteParagraph'

interface Props {
  title: string
  text: string
  bgImg: string
  scheduled: boolean
  isSubmitted: boolean
  bgSubmitted: string
  success: boolean
}
const IntroSection = ({
  title,
  text,
  bgImg,
  scheduled,
  isSubmitted,
  bgSubmitted,
  success,
}: Props) => {
  return (
    <div className='AboutUsContainer' style={{ height: '100%' }}>
      <div
        className='imgCover'
        style={{
          backgroundImage: `url(${isSubmitted ? bgSubmitted : bgImg})`,
          height: '125vh',
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      ></div>
      {!success && (
        <h2 className='text-[#d2bb3f] mb-8 mt-3 md:mb-3 text-4xl md:text-5xl lg:text-7xl md:text-[4.5rem] font-bold font-swiss721-bold px-2 z-30'>
          {title}
        </h2>
      )}
      {!isSubmitted && (
        <div className='bg-[#d2bb3f] w-[90%] sm:w-[80%] h-[1px] md:h-[2px] my-4 max-w-[1500px] mb-8 md:mb-10'></div>
      )}
      {!scheduled && <WhiteParagraph text={text} />}
    </div>
  )
}
export default IntroSection
