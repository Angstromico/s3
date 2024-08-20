import React, { useState } from 'react'
import icon from '/icon.png'
import arrow from '/transarrow.svg'
import style from './style.module.scss'

interface Props {
  selected: string
  options: string[]
  setOption: (option: string) => void
}
const SelectStaff = ({ selected, options, setOption }: Props) => {
  const [showLis, setShowLis] = useState(false)
  const toggleLis = () => {
    setShowLis(!showLis)
  }

  const takeOption = (option: string) => {
    toggleLis()
    setOption(option)
  }

  return (
    <div className='relative cursor-pointer w-full my-10'>
      <ul
        className={`flex text-lg sm:text-xl md:text-2xl h-20 px-4 w-full rounded ${style.shadow} border boder-[#737373]`}
        onClick={toggleLis}
      >
        <li className='flex justify-between items-center w-full'>
          <span className='flex gap-2'>
            <img src={icon} alt='icon' /> {selected}
          </span>{' '}
          <img src={arrow} alt='arrow' />
        </li>
      </ul>
      {showLis && (
        <ul
          className={`absolute border boder-[#737373] left-0 top-full flex flex-col text-lg sm:text-xl md:text-2xl py-2 px-4 w-full rounded-b min-w-[110px]  z-50 ${style.shadow}`}
        >
          {options.map((option, i) => {
            return (
              <li
                className='my-4 w-full'
                onClick={() => takeOption(option)}
                key={i}
              >
                {option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
export default SelectStaff
