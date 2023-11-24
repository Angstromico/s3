import React from 'react'
import style from '../../style.module.scss'
import { useFunctions } from '@/hooks'

interface BlockElements {
  img: string
  alt: string
  date: string
  title: string
  icon: string
  altIcon: string
  author: string
  secondImg?: string
  secondAlt?: string
  content: string
  secondContent?: string
}

const BlogBlock = ({
  img,
  alt,
  date,
  title,
  icon,
  altIcon,
  author,
  secondImg,
  secondAlt,
  content,
  secondContent,
}: BlockElements) => {
  const { generateImgSrc, splitIntoParagraphs } = useFunctions()

  return (
    <div className={style.blogContainer}>
      <div className={style.cardElements}>
        <div className={style.card}>
          <img src={generateImgSrc(img)} alt={alt} />
        </div>
        <div className={style.textSection}>
          <p>{date}</p>
          <h2>{title}</h2>
          <div className={style.authorIntro}>
            <img src={generateImgSrc(icon)} alt={altIcon} />
            <p>{author}</p>
          </div>
          <div className={style.blackLine}></div>
        </div>
        <div className={style.p}>{splitIntoParagraphs(content)}</div>
        {secondImg && (
          <img
            className={style.secondImg}
            src={generateImgSrc(secondImg)}
            alt={secondAlt}
          />
        )}
        {secondContent && (
          <div className={style.p}>{splitIntoParagraphs(secondContent)}</div>
        )}
      </div>
    </div>
  )
}

export default BlogBlock
