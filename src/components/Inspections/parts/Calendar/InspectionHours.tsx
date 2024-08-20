import React from 'react'
import { INSPECTIONS_HOURS } from '@/queries'
import { useBearStore } from '@/store'
const InspectionHours = () => {
  const { choosenHour, setChoosenHour } = useBearStore()

  return (
    <div className='grid grid-cols-3 justify-between w-full gap-2 px-2 items-center my-5 mx-auto'>
      {INSPECTIONS_HOURS.map((hourObj, i) => (
        <button
          className={`text-md sm:text-lg md:text-xl p-1 my-5 md:my-6 flex items-center justify-center rounded-2xl w-28 sm:w-32 md:w-36 z-30 text-center mx-auto ${
            hourObj.hour === choosenHour ? 'bg-goldS3' : ''
          } ${
            !hourObj.avaible
              ? 'text-grayS3 line-through cursor-not-allowed'
              : 'cursor-pointer'
          }`}
          type='button'
          key={i}
          onClick={() => setChoosenHour(hourObj.hour)}
          disabled={!hourObj.avaible}
        >
          {hourObj.hour}
        </button>
      ))}
    </div>
  )
}
export default InspectionHours
