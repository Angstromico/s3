import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_BLOG_INFO } from '@/queries'
import { type BlogInfo } from '@/types'
import SearchBarBlog from './Parts/SearchBarBlog'
import BlogSample from './Parts/BlogSample'
import { useBearStore } from '@/store'

const Blog = () => {
  const { loading, error, data } = useQuery(GET_BLOG_INFO)
  const { lang } = useBearStore()

  if (loading) return
  if (error) return

  const blogInfo: BlogInfo[] = data.blogs.data

  return (
    <div className='text-white'>
      <SearchBarBlog />
      <BlogSample
        blogInfo={blogInfo}
        btnText={lang === 'en' ? 'Read more' : 'Leer mas'}
      />
    </div>
  )
}

export default Blog
