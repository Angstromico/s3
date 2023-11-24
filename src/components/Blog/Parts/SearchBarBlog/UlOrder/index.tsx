import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_SEARCH_BLOG_INFO } from '@/queries'
import { type SearchBarBlog } from '@/types'
import style from './styleUL.module.scss'
import Arrow from 'a/arrow.png'
import { useBearStore } from '@/store'

interface ULSearch {
  version: 'order' | 'labels'
}

const ULOrder = ({ version }: ULSearch) => {
  const { loading, error, data } = useQuery(GET_SEARCH_BLOG_INFO)
  const [showLis, setShowLis] = useState(false)
  const { setBlogList, setBlogLabel, lang, blogLabel, setBlogAlpha } =
    useBearStore()

  const toggleLis = () => {
    setShowLis(!showLis)
  }

  const blogChoose = (chosen: string, version: 'order' | 'labels') => {
    if (chosen === 'A-Z' || chosen === 'Z-A') {
      setBlogAlpha(chosen === 'A-Z' ? 'a' : 'z')
      return
    }
    if (version === 'order') setBlogList(chosen)
    if (version === 'labels') setBlogLabel(chosen)
    setBlogAlpha('')
  }

  if (loading) return
  if (error) return

  const searchInfo: SearchBarBlog = data.searchBlog.data.attributes
  const {
    title,
    titulo,
    orderBy,
    ordenadoPor,
    labelsTitle,
    tituloEtiquetas,
    labels,
    etiquetas,
  } = searchInfo

  const order = lang === 'en' ? orderBy : ordenadoPor
  const marks = lang === 'en' ? labels : etiquetas

  const setTitle = () => {
    if (version === 'order')
      return <li className={style.top}>{lang === 'en' ? title : titulo}</li>
    if (version === 'labels')
      return (
        <li className={style.top}>
          {lang === 'en' ? labelsTitle : tituloEtiquetas}
        </li>
      )
  }

  return (
    <>
      <ul className={style.searchUL} onClick={toggleLis}>
        {setTitle()}
        <img
          src={Arrow}
          alt='Flecha'
          className={`transition-all ${
            showLis ? 'rotate-180' : ''
          } cursor-pointer`}
        />
        {version === 'order' &&
          showLis &&
          order.map((order, i) => {
            return (
              <li
                className='cursor-pointer'
                onClick={() => blogChoose(order.field, version)}
                key={i}
              >
                {order.field}
              </li>
            )
          })}
        {version === 'labels' &&
          showLis &&
          marks.map((order, i) => {
            return (
              <li
                className='cursor-pointer'
                onClick={() => blogChoose(order.field, version)}
                key={i}
              >
                {order.field}
              </li>
            )
          })}
      </ul>
      {blogLabel && version === 'labels' && (
        <div
          className='cursor-pointer relative my-auto mt-5'
          onClick={() => setBlogLabel('')}
        >
          {blogLabel}{' '}
          <span className='text-[#2C2D2F] font-bold text-base mb-3 bg-[#D3BC2A] rounded-full absolute top-[-8px] right-4 md:right-[-15px] h-5 w-5 text-center flex justify-center items-center'>
            x
          </span>
        </div>
      )}
    </>
  )
}

export default ULOrder
