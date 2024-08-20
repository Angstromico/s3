import React from 'react'

interface Props {
  text: string
}
const WhiteParagraph = ({ text }: Props) => {
  return (
    <div className='textContainer'>
      <p>{text}</p>
    </div>
  )
}
export default WhiteParagraph
