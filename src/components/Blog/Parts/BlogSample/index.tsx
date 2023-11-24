import React, { useState, useEffect, useMemo } from 'react'
import { useFunctions } from '@/hooks'
import { type BlogInfo } from '@/types'
import style from './Sample.style.module.scss'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useBearStore } from '@/store'
import Pagination from '@/components/Pagination'

type BlogParts = BlogInfo[] | BlogInfo[][]

interface BlogData {
  blogInfo: BlogInfo[]
  btnText: string
}

const BlogSample = ({ blogInfo, btnText }: BlogData) => {
  const { generateImgSrc, arrsSegments } = useFunctions()
  const { lang, blogInput, blogList, blogLabel, blogAlpha } = useBearStore()
  const [blogs, setBlogs] = useState<BlogParts>([])
  const [multiple, setMultiple] = useState(false)
  const [indexedDB, setIndexDB] = useState(0)
  const allBlogs = multiple ? blogs[indexedDB] : blogs

  const blogType = {
    '': blogInfo,
    Recent: blogInfo,
    Reciente: blogInfo,
    Ancient: [...blogInfo].reverse(),
    Antiguo: [...blogInfo].reverse(),
  }

  const modifyStringArray = (order: '' | 'a' | 'z', blog: BlogInfo[]) => {
    if (!order) return blog
    if (order == 'a')
      return blog
        .slice()
        .sort((a, b) =>
          lang === 'en'
            ? a.attributes.Title.localeCompare(b.attributes.Title)
            : a.attributes.Titulo.localeCompare(b.attributes.Titulo)
        )
    if (order == 'z')
      return blog
        .slice()
        .sort((a, b) =>
          lang === 'en'
            ? a.attributes.Title.localeCompare(b.attributes.Title)
            : a.attributes.Titulo.localeCompare(b.attributes.Titulo)
        )
        .reverse()
  }

  const filteredBlogs = useMemo(() => {
    const blogTime: BlogInfo[] = blogType[blogList]
    const myBlog = blogTime.filter((blog) => {
      if (!blogLabel) return blogTime
      if (lang === 'en') return blog.attributes.label === blogLabel
      if (lang === 'es-CR') return blog.attributes.etiqueta === blogLabel
    })
    const alphaBlogTitles = modifyStringArray(blogAlpha, myBlog)

    if (lang === 'en') {
      return alphaBlogTitles.filter((blog) =>
        blog.attributes.Title.toLowerCase().includes(blogInput.toLowerCase())
      )
    } else {
      return alphaBlogTitles.filter((blog) =>
        blog.attributes.Titulo.toLowerCase().includes(blogInput.toLowerCase())
      )
    }
  }, [blogInput, lang, blogList, blogLabel, blogAlpha])

  useEffect(() => {
    if (filteredBlogs.length > 5) {
      setBlogs(arrsSegments(filteredBlogs))
      setMultiple(true)
    } else {
      setBlogs(filteredBlogs)
      setMultiple(false)
    }
  }, [filteredBlogs])

  return (
    <div className={style.cardContainer}>
      {allBlogs.map((blog, i: number) => {
        const {
          Image,
          Title,
          Titulo,
          Date,
          Fecha,
          Author,
          Autor,
          LinkBlog,
          Icon,
          Resume,
          Resumen,
        } = blog.attributes
        const imgUrl = generateImgSrc(Image.data.attributes.url)
        const altImg = Image.data.attributes.alternativeText
        const iconUrl = generateImgSrc(Icon.data.attributes.url)
        const altIcon = Icon.data.attributes.alternativeText

        return (
          <div key={i} className={style.cardElements}>
            <div className={style.card}>
              <img src={imgUrl} alt={altImg} />
            </div>
            <div className={style.textSection}>
              <p>{lang === 'en' ? Date : Fecha}</p>
              <h2>{lang === 'en' ? Title : Titulo}</h2>
              <div className={style.authorIntro}>
                <img src={iconUrl} alt={altIcon} />
                <p>{lang === 'en' ? Author : Autor}</p>
              </div>
              <div className={style.blackLine}></div>
              <p className={style.deskHide}>{lang === 'en' ? Author : Autor}</p>
              <p className={style.resume}>{lang === 'en' ? Resume : Resumen}</p>
              <Link to={LinkBlog}>
                {btnText} <AiOutlineArrowRight />
              </Link>
            </div>
          </div>
        )
      })}
      {multiple && (
        <Pagination
          arrLength={blogs.length}
          itemsPerPage={4}
          setChosen={setIndexDB}
        />
      )}
      {filteredBlogs.length === 0 && (
        <h1 className='text-center text-9xl my-60 text-[#D3BC2A]'>
          {lang === 'en'
            ? 'No results matched for this blog'
            : 'No resultados encontrados para este blog'}
        </h1>
      )}
    </div>
  )
}

export default BlogSample
