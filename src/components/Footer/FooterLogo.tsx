import React from 'react'
import style from './style.module.scss'
import { Link } from 'react-router-dom'
import { type Logo } from './Types'

interface LogoContent {
  logo: Logo
}

const FooterLogo = ({ logo }: LogoContent) => {
  return (
    <div className={style.logo}>
      <Link to='/'>
        <img src={logo.url} alt={logo.altText} />
      </Link>
    </div>
  )
}

export default FooterLogo
