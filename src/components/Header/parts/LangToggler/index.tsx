import React, { useState } from 'react'
import styling from '../../style.module.scss'
import arrow from 'a/arrowvector.svg'
import { useBearStore } from '@/store'

type Langs = 'EN' | 'ES'

function LangToggler() {
  const [lang, setLang] = useState<Langs>('ES')
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [otherLang, setOtherLang] = useState<Langs>('EN')
  const { setLang: changeLang } = useBearStore()

  const toggleMenu = () => setLangMenuOpen(!langMenuOpen)

  const selectLang = () => {
    if (lang === 'EN') {
      setLang('ES')
      setOtherLang('EN')
      changeLang('es-CR')
    }

    if (lang === 'ES') {
      setLang('EN')
      setOtherLang('ES')
      changeLang('en')
    }
  }

  return (
    <li className={styling.lang} onClick={toggleMenu}>
      <span>{lang}</span>{' '}
      <img
        className={langMenuOpen ? styling.outsidedown : ''}
        src={arrow}
        alt='arrow'
      />
      <span
        onClick={selectLang}
        className={`${styling.another} ${langMenuOpen ? styling.show : ''}`}
      >
        {otherLang}
      </span>
    </li>
  )
}

export default LangToggler
