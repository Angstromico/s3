import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BLOG_INFO } from '@/queries'
import { type BlogInfo, type BlogAttributes } from '@/types'
import { useBearStore } from '@/store'
import { useParams } from 'react-router-dom'
import BlogBlock from './parts/BlogBlock'

const SingleBlog = () => {
  const { loading, error, data } = useQuery(GET_BLOG_INFO)
  const [singleBlog, setSingleBlog] = useState<BlogAttributes | null>(null)
  const { lang } = useBearStore()
  const params = useParams()
  const { blogPage } = params
  let blogInfo: BlogInfo[]

  useEffect(() => {
    if (!loading) {
      const filterBlog = blogInfo.filter(
        (blog) => blog.attributes.LinkBlog === blogPage
      )
      const ourBlog = filterBlog[0].attributes
      setSingleBlog(ourBlog)
    }
  }, [loading, blogInfo])

  const getLang = (en: string, es: string) => {
    if (lang === 'en') return en
    if (lang === 'es-CR') return es
  }

  if (loading) return
  if (error) return

  blogInfo = data.blogs.data
  if (!singleBlog) return

  const {
    Title,
    Titulo,
    Content,
    Contenido,
    Date,
    Fecha,
    Image,
    Icon,
    Author,
    Autor,
    ExtraImg,
    ExtraContent,
    ContenidoExtra,
  } = singleBlog

  const t = getLang(Title, Titulo)
  const c = getLang(Content, Contenido)
  const d = getLang(Date, Fecha)
  const { url, alternativeText } = Image.data.attributes
  const { url: urlIcon, alternativeText: altIcon } = Icon.data.attributes
  const a = getLang(Author, Autor)
  const { url: secondImg, alternativeText: secondAlt } =
    ExtraImg.data.attributes
  const extra = getLang(ExtraContent, ContenidoExtra)

  return (
    <BlogBlock
      title={t}
      content={c}
      date={d}
      img={url}
      alt={alternativeText}
      icon={urlIcon}
      altIcon={altIcon}
      author={a}
      secondAlt={secondAlt}
      secondImg={secondImg}
      secondContent={extra}
    />
  )
}

export default SingleBlog
