import React from 'react'
import HamburguerButton from '../HamburguerButton'
import { Link } from 'react-router-dom'
import { type Links } from '../types'
import styles from '../../style.module.scss'
import { useHeaderCallbacks } from '../HeaderCallbacks'
import LangToggler from '../LangToggler'

interface MobileInfo {
  style: string
  handleBurguer: () => void
  styleItems: string
  styleItemsHidden: string
  closeButtonStyle: string
  hiddenMobileLinks: boolean
  links: Links[]
  path: string
  currentPage: string
}

const MobileMenu = ({
  style,
  handleBurguer,
  styleItems,
  styleItemsHidden,
  closeButtonStyle,
  hiddenMobileLinks,
  links,
  path,
  currentPage,
}: MobileInfo) => {
  const { choseScroll, optionLink } = useHeaderCallbacks(path)

  return (
    <div className={style}>
      <div onClick={handleBurguer}>
        <HamburguerButton />
      </div>
      <ul className={`${hiddenMobileLinks ? styleItemsHidden : styleItems}`}>
        <div className={closeButtonStyle} onClick={handleBurguer}>
          <button>X</button>
        </div>
        <div className={styles.liContainer}>
          <div className={styles.lis}>
            {links.map((linkInfo, index: number) => {
              const { name, link } = linkInfo

              return (
                <li key={index} className={path === link ? currentPage : ''}>
                  <Link
                    onClick={() => choseScroll(link, handleBurguer)}
                    to={optionLink(link)}
                  >
                    {name}
                  </Link>
                </li>
              )
            })}
            <LangToggler />
          </div>
        </div>
      </ul>
    </div>
  )
}

export default MobileMenu
