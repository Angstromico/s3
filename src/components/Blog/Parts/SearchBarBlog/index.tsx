import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_SEARCH_BLOG_INFO } from '@/queries'
import { type SearchBarBlog } from '@/types'
import style from './style.module.scss'
import { useBearStore } from '@/store'
import MobileSearch from './MobileSearch'
import DesktopSearch from './DesktopSearch'

const SearchBarBlog = () => {
  const { loading, error, data } = useQuery(GET_SEARCH_BLOG_INFO)
  const { lang } = useBearStore()

  if (loading) return
  if (error) return

  const searchInfo: SearchBarBlog = data.searchBlog.data.attributes
  const { button, boton } = searchInfo
  const btnText = lang === 'en' ? button : boton

  return (
    <div className={style.searchBar}>
      <MobileSearch btnText={btnText} />
      <DesktopSearch btnText={btnText} />
    </div>
  )
}

export default SearchBarBlog
