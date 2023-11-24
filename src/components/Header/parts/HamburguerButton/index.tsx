import React from 'react'

const HamburguerButton = () => {
  return (
    <button
      type='button'
      className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:bg-gray-700 focus:text-white transition duration-1000 ease-in-out'
      aria-label='Main menu'
    >
      <svg
        width='24'
        height='20'
        viewBox='0 0 24 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M22.668 18H1.33464M22.668 2H1.33464H22.668ZM22.668 10H12.0013H22.668Z'
          stroke='white'
          strokeWidth='2.56'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  )
}

export default HamburguerButton
