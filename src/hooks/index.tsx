import { useCallback } from 'react'
import {
  type Directions,
  type Socials,
  type IconsInfo,
} from '@/components/Footer/Types'
import { type Children, type BlogInfo } from '@/types'
import React from 'react'

export const useFunctions = () => {
  const generateImgSrc = (url: string) => {
    const backendUrl = import.meta.env.VITE_APP_BACKEND_IMAGES
    return backendUrl + url
  }

  const iconsInfo = useCallback((ourIcons: Directions | Socials) => {
    const icons: IconsInfo[] = []
    Object.keys(ourIcons).forEach(function (key) {
      const element = ourIcons[key]

      icons.push(element)
    })
    return icons
  }, [])

  const arrsSegments = (arr: Children[] | BlogInfo[]) => {
    const miniArrays: Children[][] | BlogInfo[][] = []
    let miniArray: Children[] | BlogInfo[] = []

    arr.forEach((element, index) => {
      miniArray.push(element)

      if (miniArray.length === 5 || index === arr.length - 1) {
        miniArrays.push(miniArray)
        miniArray = []
      }
    })

    return miniArrays
  }

  const splitIntoParagraphs = (text: string) => {
    const paragraphs = text.split(/\s{2,}/g)

    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }

  return { generateImgSrc, iconsInfo, arrsSegments, splitIntoParagraphs }
}
