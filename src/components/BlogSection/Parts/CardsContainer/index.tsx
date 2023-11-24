import React from 'react'
import { useFunctions } from '@/hooks'
import { type BlogAttributes } from '@/types'
import style from '../../style.module.scss'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useBearStore } from '@/store'

interface BlogData {
  blogInfo: BlogAttributes[]
  btnText: string
}

const CardsContainer = ({ blogInfo, btnText }: BlogData) => {
  const { generateImgSrc } = useFunctions()
  const { lang } = useBearStore()

  return (
    <div className={style.cardContainer}>
      {blogInfo.map((blog: BlogAttributes, i: number) => {
        const {
          url,
          altImg,
          Title,
          Titulo,
          Date,
          Fecha,
          Author,
          Autor,
          LinkBlog,
        } = blog
        const imgUrl = generateImgSrc(url)
        const blogLink = 'blog/' + LinkBlog

        return (
          <div key={i} className={style.cardElements}>
            <div className={style.card}>
              <img src={imgUrl} alt={altImg} />
            </div>
            <div className={style.textSection}>
              <p>{lang === 'en' ? Date : Fecha}</p>
              <h2>{lang === 'en' ? Title : Titulo}</h2>
              <div className={style.blackLine}></div>
              <p>{lang === 'en' ? Author : Autor}</p>
              <Link to={blogLink}>
                {btnText} <AiOutlineArrowRight />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CardsContainer
