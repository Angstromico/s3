import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center w-full py-64 flex-col'>
      <h1 className='text-center text-6xl sm:text-7xl md:text-8xl text-carbonBlue'>
        Pagina no encontrada
      </h1>
      <Link
        className='text-white bg-[#d2bb3f] py-2 px-3 mt-10 rounded font-bold hover:bg-white hover:text-[#d2bb3f] hover:scale-110 transition-all'
        to='/'
      >
        Volver a Casa
      </Link>
    </div>
  )
}
export default NotFound
