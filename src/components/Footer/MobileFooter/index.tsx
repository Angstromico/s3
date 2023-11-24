import React from 'react'
import { useState, useEffect } from 'react'
import style from '../style.module.scss'
import { Link } from 'react-router-dom'
import { useFunctions } from '@/hooks'
import FooterLogo from '../FooterLogo'
import FooterIcons from '../FooterIcons'
import { type FooterInfo, type IconsInfo } from '../Types'

const MobileFooter = ({
  logo,
  addresses,
  socialsNetworks,
  button,
}: FooterInfo) => {
  const [directions, setDirections] = useState<IconsInfo[]>([])
  const [socials, setSocials] = useState<IconsInfo[]>([])
  const { iconsInfo } = useFunctions()

  useEffect(() => {
    setDirections(iconsInfo(addresses))
    setSocials(iconsInfo(socialsNetworks))
  }, [addresses])

  return (
    <div className={style.mobile}>
      <FooterLogo logo={logo} />
      <div className={style.icons}>
        <div className={style.directions}>
          <FooterIcons arr={directions} />
        </div>
        <div className={style.socials}>
          <FooterIcons arr={socials} />
        </div>
      </div>
      <div className={style.button}>
        <Link to='/'>{button}</Link>
      </div>
    </div>
  )
}

export default MobileFooter
