import React from 'react'
import type { SuccessScreen } from '@/pages/Page'
import { useBearStore } from '@/store'
import { useFunctions } from '@/hooks'
import { Link } from 'react-router-dom'

interface Props {
  successScreen: SuccessScreen
}

const SuccessScreen = ({ successScreen }: Props) => {
  const { lang } = useBearStore()
  const { generateImgSrc } = useFunctions()
  const {
    title,
    titulo,
    goldIcon,
    subtitle,
    subtitulo,
    back,
    volver,
    another,
    otra,
  } = successScreen

  const image = generateImgSrc(goldIcon.data.attributes.url, true)

  const theTitle = lang === 'en' ? title : titulo
  const theSubtitle = lang === 'en' ? subtitle : subtitulo
  const comeback = lang === 'en' ? back : volver
  const newOne = lang === 'en' ? another : otra

  return (
    <div className='w-full mt-52 sm:mt-60 md:mt-72 flex flex-col justify-center mx-auto'>
      <h2 className='text-[#d2bb3f] mb-8 md:mb-3 text-4xl md:text-6xl lg:text-8xl md:text-[4.5rem] font-bold font-swiss721-bold px-2 z-30'>
        {theTitle}
      </h2>
      <img
        className='w-36 md:w-48 mx-auto my-12'
        src={image}
        alt={goldIcon.data.attributes.alternativeText}
      />
      <p className='text-white text-lg sm:text-3xl top-16'>{theSubtitle}</p>
      <Link
        to='/'
        className='bg-blackS3 text-white px-3 py-5 text-xl md:text-2xl rounded-lg mt-6 sm:mt-32 mb-8  mx-auto w-1/4 min-w-[250px] max-w-xl'
      >
        {comeback}
      </Link>
      <Link
        to='/inspeccion'
        className='bg-transparent border-4 border-blackS3 text-blackS3 px-3 py-4 text-xl md:text-2xl rounded-lg mt-12 mb-8 mx-auto w-1/4 min-w-[250px] max-w-xl'
      >
        {newOne}
      </Link>
    </div>
  )
}
export default SuccessScreen
