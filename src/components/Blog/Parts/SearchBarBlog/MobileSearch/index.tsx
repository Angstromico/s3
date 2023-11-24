import React, { useState } from 'react'
import BurgerButton from '../BurgerButton'
import Bar from '../Bar'
import SearchBtn from '../SearchBtn'
import ULOrder from '../UlOrder'

interface Btn {
  btnText: string
}

const MobileSearch = ({ btnText }: Btn) => {
  const [show, setShow] = useState(false)

  const showOptions = () => {
    setShow(!show)
  }

  return (
    <div className='flex md:hidden flex-col gap-4 mx-2 px-2 w-[90%] bg-[#2c2d2f]'>
      <div className='flex justify-around w-full'>
        <BurgerButton showOptions={showOptions} />
        <Bar />
      </div>
      <div
        className={`${
          show ? 'block' : 'hidden'
        } flex justify-around gap-4 w-full px-auto py-3 bg-[#2c2d2f] px-7 h-96`}
      >
        <div>
          <ULOrder version='order' />
          <ULOrder version='labels' />
        </div>
        <div className='flex justify-center h-[20%] mt-4'>
          <SearchBtn text={btnText} />
        </div>
      </div>
    </div>
  )
}

export default MobileSearch
