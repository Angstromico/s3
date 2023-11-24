import React from 'react'
import { Link } from 'react-router-dom'

interface LinkInfo {
  src: string
  alt: string
  style: string
}

const LogoLink = ({ src, alt, style }: LinkInfo) => {
  return (
    <Link to='/'>
      <img src={src} alt={alt} className={style} />
    </Link>
  )
}

export default LogoLink
