import React from 'react'

interface ErrorMessage {
  activate: boolean
  message: string
}

const ErrorMessage = ({ activate, message }: ErrorMessage) => {
  return (
    <div className='w-[90%] md:w-full'>
      {activate && <p className='error_field'>{message}</p>}
    </div>
  )
}
export default ErrorMessage
