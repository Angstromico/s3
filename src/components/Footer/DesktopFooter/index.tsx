import React from 'react'
import { useState, useEffect } from 'react'
import { useFunctions } from '@/hooks'
import { Link } from 'react-router-dom'
import style from '../style.module.scss'
import { type FooterInfo, type IconsInfo } from '../Types'
import FooterLogo from '../FooterLogo'
import FooterIcons from '../FooterIcons'

const DesktopFooter = ({
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
    <div className={style.desktop}>
      <FooterLogo logo={logo} />
      <div className={style.directions}>
        <div className={style.icons}>
          <FooterIcons arr={directions} />
        </div>
        <div className={style.button}>
          <Link to='/'>{button}</Link>
        </div>
      </div>
      <div className={style.socials}>
        {socials.map((social, i: number) => {
          const { url, altText, link, title } = social

          return (
            <div className={style.imgText} key={i}>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                <img src={url} alt={altText} />
              </a>
              <p>{title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DesktopFooter
