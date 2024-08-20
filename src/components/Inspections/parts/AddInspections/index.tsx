import React from 'react'

interface Props {
  text: string
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  behind?: boolean
}

const AddInspections = ({ text, setOpenDialog, behind }: Props) => {
  return (
    <div
      className='my-16 w-[85%] md:w-[31%] flex gap-3 md:gap-0'
      onClick={() => setOpenDialog(true)}
    >
      <button
        type='button'
        className={`bg-goldS3 text-blackS3 w-full h-20 px-4 text-lg sm:text-xl md:text-2xl rounded-lg min-w-[105px] font-swiss721-bold font-bold flex items-center cursor-pointer gap-4  ${
          behind ? '' : 'z-50'
        }`}
      >
        {text}{' '}
        <span className='text-3xl sm:text-4xl md:text-5xl font-swiss721-light font-light mt-1'>
          +
        </span>
      </button>
    </div>
  )
}
export default AddInspections
