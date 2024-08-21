import React from 'react'
import ChoseEngineer from './ChosenEngineer'

interface Props {
  title: string
  changeSchedule: () => void
  selectedPhrase: string
  AddInspections: string
}
const Scheduled = ({
  title,
  changeSchedule,
  selectedPhrase,
  AddInspections,
}: Props) => {
  return (
    <div className='w-[90%] max-w-[1400px] mx-auto my-12 text-left'>
      <h2 className='text-white md:text-[#2C2D2F] text-2xl sm:text-3xl md:text-4xl  font-swiss721-black font-bold my-8'>
        {title}
      </h2>
      <ChoseEngineer
        changeSchedule={changeSchedule}
        selectedPhrase={selectedPhrase}
        addInspection={AddInspections}
        scheduleTitle={title}
      />
    </div>
  )
}
export default Scheduled
