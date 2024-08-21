import React, { useState, useMemo } from 'react'
import YellowArrow from '/YellowArrow.png'
import { useBearStore } from '@/store'

interface Props {
  selectedPhrase: string
  engineer: {
    name: string
  }[]
  j: number
}

const SelectService = ({ selectedPhrase, engineer, j }: Props) => {
  const [showLis, setShowLis] = useState(false)
  const { updateInspectionChoosen, inspections } = useBearStore()
  const toggleLis = () => {
    setShowLis(!showLis)
  }

  const clickEngineer = (i: number) => {
    toggleLis()
    updateInspectionChoosen(j, i)
  }

  const detectChoosen = useMemo(() => {
    const choosen = inspections[j].choosen
    const inspectEngineer = inspections[j].engineer
    if (choosen || !isNaN(choosen)) {
      const choosenOne = inspectEngineer[choosen].name
      return choosenOne
    }
    return null
  }, [inspections])

  return (
    <div className='relative w-full flex gap-3'>
      <ul
        className='bg-blackS3 text-white w-full h-20 pl-5 pr-12 text-xl sm:text-2xl md:text-[1.7rem] rounded-lg min-w-[130px] font-swiss721-bold font-bold flex flex-col justify-center items-center relative cursor-pointer'
        onClick={toggleLis}
      >
        <img
          className={`absolute top-9 w-6 right-[1.75rem] transition-duration-all ${
            showLis ? 'rotate-180' : ''
          }`}
          src={YellowArrow}
          alt='Flecha amarilla'
        />
        <li>{detectChoosen !== null ? detectChoosen : selectedPhrase}</li>
      </ul>
      {showLis && (
        <ul className='absolute left-0 top-full mt-2 bg-blackS3 text-white w-full rounded-lg z-10 md: py-2 px-4 text-xl sm:text-2xl md:text-[1.7rem] min-w-[113px] font-swiss721-bold font-bold flex flex-col items-center cursor-pointer'>
          {engineer.map((engi, i) => (
            <li key={i} className='my-5' onClick={() => clickEngineer(i)}>
              {engi.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SelectService
