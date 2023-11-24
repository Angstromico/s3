import React, { useState, useEffect, useCallback } from 'react'
import TextTransition, { presets } from 'react-text-transition'

interface Hero {
  bgImg: string
  lyrics: string[]
  fixText: string
}

const HeroBanner = ({ bgImg, lyrics, fixText }: Hero) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const textChanger = useCallback(
    (time: number) => {
      {
        setInterval(() => {
          setCurrentIndex((currentIndex) => (currentIndex + 1) % lyrics.length)
        }, time)
      }
    },
    [lyrics]
  )

  useEffect(() => {
    textChanger(3500)
  }, [textChanger])

  return (
    <div
      style={{ backgroundImage: `url(${bgImg})` }}
      className='bg-no-repeat md:bg-center md:bg-cover w-full h-[600px] md:h-[800px] lg:h-[1000px]'
    >
      <div className='pt-[400px] sm:pt-[500px] md:pt-[600px] lg:pt-[800px] pl-[2%] sm:pl-[5%] md:pl-[10%] flex justify-start items-center gap-8'>
        <h2 className='Hero text-[4.3rem] sm:text-[7rem] md:text-[9rem] font-bold h-12 text-white'>
          {fixText}
        </h2>
        <h2 className='Hero text-[4.3rem] sm:text-[7rem] md:text-[9rem] font-bold h-12 text-[#d2bb3f]  transition-all duration-1000'>
          <TextTransition springConfig={presets.gentle}>
            {lyrics[currentIndex]}
          </TextTransition>
        </h2>
      </div>
    </div>
  )
}

export default HeroBanner
