import React from 'react'
import { type Children } from '@/types'

interface Props {
  children: Children
  bgImg: string
  title: string
  subtitle: string
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}
const FormContainer = ({
  children,
  bgImg,
  title,
  subtitle,
  handleSubmit,
}: Props) => {
  return (
    <div
      className='w-full h-[900px] sm:h-[1000px] md:h-[1100px] bg-center bg-no-repeat bg-cover grid justify-center items-center pb-6 md:items-start grid-cols-1 md:grid-cols-2'
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className='flex items-center md:ml-[5%] md:items-start flex-col justify-center mt-48 pb-32'>
        <h2 className='text-6xl sm:text-7xl md:text-8xl text-center md:text-left font-bold text-[#2c2d2f] mb-2'>
          {title}
        </h2>
        <h3 className='text-2xl sm:text-3xl md:text-4xl text-center md:text-left font-light text-[#2c2d2f] w-[80%] md:w-full mb-12 md:mb-20 px-3 md:px-0'>
          {subtitle}
        </h3>
        <form
          className='w-[90%] md:min-w-[500px] md:w-full bg-transparent md:max-w-[50%]'
          onSubmit={handleSubmit}
        >
          {children}
        </form>
      </div>
    </div>
  )
}

export default FormContainer
