import React from 'react'

interface WhiteParagraphs {
  firstP: string
  secondP: string
}

const WhiteParagraphs = ({ firstP, secondP }: WhiteParagraphs) => {
  return (
    <div className='textContainer'>
      <p>{firstP}</p>
      <p>{secondP}</p>
    </div>
  )
}

export default WhiteParagraphs
