import React from 'react'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_HEADER_INFO } from '@/queries'
import { useFunctions } from '@/hooks'
import style from './style.module.scss'
import { useLocation } from 'react-router-dom'
import LogoLink from './parts/Logo'
import MobileMenu from './parts/MobileMenu'
import DekstopMenu from './parts/DesktopMenu'

const Header = () => {
  const [hiddenMobileLinks, setHiddenMobileLinks] = useState(true)
  const { loading, error, data } = useQuery(GET_HEADER_INFO)
  const { generateImgSrc } = useFunctions()
  let length: number
  const location = useLocation()
  const path = location.pathname

  const handleBurguer = () => {
    setHiddenMobileLinks(!hiddenMobileLinks)
  }

  if (loading) return <h1 className='messageText'>Loading...</h1>
  if (error) return <h1 className='messageText'>Error...</h1>

  const headerInfo = data.header.data.attributes
  const { Logo, Links } = headerInfo
  const { url, alternativeText } = Logo.data.attributes
  const logoUrl = generateImgSrc(url)
  length = Links.length

  return (
    <nav className={style.menu}>
      <LogoLink src={logoUrl} alt={alternativeText} style={style.logo} />
      <MobileMenu
        style={style.mobile}
        handleBurguer={handleBurguer}
        styleItems={style.itemsMobile}
        styleItemsHidden={style.notItemsMobile}
        closeButtonStyle={style.closeButtonContainer}
        hiddenMobileLinks={hiddenMobileLinks}
        links={Links}
        path={path}
        currentPage={style.currentPage}
      />
      <DekstopMenu
        style={style.items}
        links={Links}
        path={path}
        currentPage={style.currentPage}
      />
    </nav>
  )
}

export default Header
