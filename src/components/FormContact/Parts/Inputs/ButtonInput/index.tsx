import React from 'react'

interface BtnProps {
  BtnText: string
}

const ButtonInput = ({ BtnText }: BtnProps) => {
  return (
    <div className='w-full flex justify-center items-center mt-9 md:mt-24'>
      <button
        className='rounded-md text-2xl md:text-3xl bg-white py-4 px-8  text-[#2c2d2f] font-semibold mr-4'
        type='submit'
      >
        {BtnText}
      </button>
    </div>
  )
}

export default ButtonInput
