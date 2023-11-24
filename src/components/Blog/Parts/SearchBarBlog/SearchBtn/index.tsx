import React from 'react'
import { useBearStore } from '@/store'

interface btntext {
  text: string
}

const SearchBtn = ({ text }: btntext) => {
  const { blogInput, setBlogInput } = useBearStore()

  return (
    <button
      type='button'
      className='text-white text-xl md:text-2xl font-bold transition-all duration-500 bg-[#d2bb3f] rounded-xl p-5'
      onClick={() => setBlogInput(blogInput)}
    >
      {text}
    </button>
  )
}

export default SearchBtn
