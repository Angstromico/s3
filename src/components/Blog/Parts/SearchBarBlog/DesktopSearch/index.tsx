import React from 'react'
import ULOrder from '../UlOrder'
import Bar from '../Bar'
import SearchBtn from '../SearchBtn'

interface Btn {
  btnText: string
}

const DesktopSearch = ({ btnText }: Btn) => {
  return (
    <div className='gap-5 hidden md:flex bg-[#2c2d2f] ml-8 px-2 w-[90%] lg:ml-[20%]'>
      <ULOrder version='order' />
      <ULOrder version='labels' />
      <Bar />
      <div className='ml-8 flex justify-center items-start mt-6'>
        <SearchBtn text={btnText} />
      </div>
    </div>
  )
}

export default DesktopSearch
