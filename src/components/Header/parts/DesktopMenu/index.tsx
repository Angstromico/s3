import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { type Links } from '../types'
import { useHeaderCallbacks } from '../HeaderCallbacks'
import LangToggler from '../LangToggler'
import { useBearStore } from '@/store'

interface DesktopInfo {
  style: string
  links: Links[]
  path: string
  currentPage: string
}

const DekstopMenu = ({ style, links, path, currentPage }: DesktopInfo) => {
  const { choseScroll, optionLink } = useHeaderCallbacks(path)
  const { lang } = useBearStore()

  return (
    <ul className={style}>
      {links.map((linkInfo, index: number) => {
        const { name, link, nombre } = linkInfo

        return (
          <li key={index} className={path === link ? currentPage : ''}>
            <Link onClick={() => choseScroll(link)} to={optionLink(link)}>
              {lang === 'en' ? name : nombre}
            </Link>
          </li>
        )
      })}
      <LangToggler />
    </ul>
  )
}

export default DekstopMenu
