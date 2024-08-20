import React, { useState } from 'react'
import arrow from '/YellowArrow.png'

interface Props {
  title: string
  options: string[]
  setOption: (option: string) => void
}
const SelectDirections = ({ title, options, setOption }: Props) => {
  const [showLis, setShowLis] = useState(false)
  const toggleLis = () => {
    setShowLis(!showLis)
  }

  const selectOne = (option: string) => {
    toggleLis()
    setOption(option)
  }

  return (
    <div className='relative cursor-pointer w-[88%] sm:w-[80%] md:w-[22%]'>
      <ul
        className='flex text-white text-lg sm:text-xl md:text-2xl font-swiss721-bold font-bold h-20 px-4 w-full bg-blackS3 rounded-lg min-w-[110px]'
        onClick={toggleLis}
      >
        <li className='flex gap-6 items-center'>
          {title}{' '}
          <img
            className={`${showLis ? 'rotate-180' : ''}`}
            src={arrow}
            alt='flecha'
          />
        </li>
      </ul>
      {showLis && (
        <ul className='absolute left-0 top-full flex flex-col text-white text-lg sm:text-xl md:text-2xl font-swiss721-bold font-bold py-2 px-4 w-full bg-blackLightS3 rounded-b-lg min-w-[110px] md:min-w-[200px] z-50'>
          {options.map((option, i) => {
            return (
              <li className='my-4' onClick={() => selectOne(option)} key={i}>
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default SelectDirections
