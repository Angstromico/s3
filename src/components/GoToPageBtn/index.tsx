import React from 'react'
import { type TextContent } from '@/types'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'

interface BtnInfo extends TextContent {
  link: '/blog' | '/servicios' | '/portafolio'
  mt?: 'mt-3' | 'mt-6' | 'mt-8' | 'mt-10' | 'mt-12' | 'mt-16' | 'mt-24'
}

const GoToPageBtn = ({ content, link, mt }: BtnInfo) => {
  return (
    <Link className={`s3Btn ${mt ? mt : ''}`} to={link}>
      {content} <AiOutlineArrowRight />
    </Link>
  )
}

export default GoToPageBtn
