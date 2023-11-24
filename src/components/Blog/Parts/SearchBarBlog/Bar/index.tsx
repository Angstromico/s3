import React from 'react'
import searchIcon from 'a/search.svg'
import { useBearStore } from '@/store'

export type titlesArr = string[]

const Bar = () => {
  const { setBlogInput } = useBearStore()

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setBlogInput(value)
  }

  return (
    <div className='p-5 md:p-6 w-80 md:w-96 max-w-[80%] md:max-w-full relative h-auto'>
      <input
        type='search'
        className='w-full rounded'
        style={{ paddingRight: '30px' }}
        onChange={onChangeSearch}
      />
      <img
        src={searchIcon}
        alt='search icon'
        style={{
          position: 'absolute',
          top: '3.8rem',
          right: '-1rem',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}

export default Bar
