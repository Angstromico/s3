import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import { GET_BLOG_INFO } from '@/queries'
import { useQuery } from '@apollo/client'
import { type BlogAttributes, type BlogInfo, type TextContent } from '@/types'
import TitleContainer from './Parts/TitleContainer'
import CardsContainer from './Parts/CardsContainer'
import { useCallBacks } from './useCallBacks'
import GoToPageBtn from 'c/GoToPageBtn'

interface BlogHeader extends TextContent {
  read: string
  readAll: string
}

const BlogSection = ({ title, subtitle, read, readAll }: BlogHeader) => {
  const [blogInfo, setBlogInfo] = useState<BlogAttributes[]>([])
  const { loading, error, data } = useQuery(GET_BLOG_INFO)
  let info: BlogInfo[]
  const { reverseLastThree } = useCallBacks(setBlogInfo)

  useEffect(() => {
    if (!loading) reverseLastThree(info)
  }, [reverseLastThree, info, loading])

  if (loading) return
  if (error) return <h2 className='text-center'>Error...</h2>

  info = data.blogs.data

  return (
    <div className={style.BlogSection}>
      <TitleContainer title={title} />
      <p className={style.text}>{subtitle}</p>
      <CardsContainer blogInfo={blogInfo} btnText={read} />
      <GoToPageBtn content={readAll} link={'/blog'} />
    </div>
  )
}

export default BlogSection
