import React from 'react'
import { useBearStore } from '@/store'

interface Props {
  totalPriceText: string
  submitBtnText: string
}
const BottomCalendar = ({ totalPriceText, submitBtnText }: Props) => {
  const { totalPrice, directionPrice } = useBearStore()
  const total = totalPrice + directionPrice

  return (
    <div className='w-full flex flex-col mt-12 mb-5 justify-center items-center md:flex-row md:justify-between gap-5'>
      <p className='bg-white h-14 rounded-lg text-xl sm:text-2xl md:text-3xl border-2 border-goldS3 w-96 sm:w-[28rem] flex justify-between px-5 py-2 items-center'>
        {totalPriceText}{' '}
        <span className='flex gap-2'>
          <span className='line-through text-xl sm:text-2xl md:text-3xl'>
            ${total}
          </span>{' '}
          <span className='font-bold font-swiss721-bold text-2xl sm:text-3xl md:text-4xl'>
            ${total}
          </span>
        </span>
      </p>
      <button
        className='bg-blackS3 rounded-lg h-14 w-44 sm:w-56 text-white font-bold text-lg sm:text-xl md:text-2xl flex justify-center items-center px-3 py-4'
        type='submit'
      >
        {submitBtnText}
      </button>
    </div>
  )
}
export default BottomCalendar
