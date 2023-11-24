import React, { useCallback } from 'react'
import {
  type ProjectInfo,
  type ProjectsAttributes,
  type Children,
} from '@/types'
import { type FormatArray, type ProjectsFormat, type ProjectsArrs } from '../..'
import { useFunctions } from '@/hooks'
import OneCard from '../OneCard'
import TwoCards from '../TwoCards'
import ThreeCards from '../ThreeCards'
import { type title, type titulo } from '../IntroProjects'

type ProjectFunction = (projectInfo: ProjectsArrs) => void
type SetShowProjects = (projectInfo: FormatArray) => void

export const useProjectsFunctions = (
  setProjectsArrs?: ProjectFunction,
  setShowProjects?: SetShowProjects
) => {
  const { generateImgSrc } = useFunctions()

  const groupArrs = (arr: ProjectInfo[], groups: 2 | 3) => {
    const result: {
      firstContent: ProjectInfo
      secondContent: ProjectInfo | null
      thirdContent?: ProjectInfo | null
    }[] = []

    for (let i = 0; i < arr.length - 1; i += groups) {
      const obj =
        groups === 2
          ? {
              firstContent: arr[i],
              secondContent: arr[i + 1] ? arr[i + 1] : null,
            }
          : {
              firstContent: arr[i],
              secondContent: arr[i + 1] ? arr[i + 1] : null,
              thirdContent: arr[i + 2] ? arr[i + 2] : null,
            }
      result.push(obj)
    }

    return result
  }

  const formatProjects = (projects: ProjectInfo[]) => {
    const formatted: FormatArray = []

    const oneProjects = projects.filter((p) => p.presentation === 'one')
    const twoProjects = projects.filter((p) => p.presentation === 'two')
    const twoGroupsProjects = groupArrs(twoProjects, 2)
    const threeProjects = projects.filter((p) => p.presentation === 'three')
    const threeGroupsProjects = groupArrs(threeProjects, 3)

    projects.forEach((project, i: number) => {
      if (!oneProjects[i] && !twoGroupsProjects[i] && !threeGroupsProjects[i])
        return

      const elements: ProjectsFormat = {
        first: {
          content: oneProjects[i] ? oneProjects[i] : null,
        },
        second: twoGroupsProjects[i] ? twoGroupsProjects[i] : null,
        third: threeGroupsProjects[i] ? threeGroupsProjects[i] : null,
      }
      formatted.push(elements)
    })

    return formatted
  }

  const getProjectsInfo = useCallback((info: ProjectsAttributes[]) => {
    const allProjects: ProjectInfo[] = []
    const residentialProjects: ProjectInfo[] = []
    const industrialProjects: ProjectInfo[] = []
    const educationalProjects: ProjectInfo[] = []

    info.forEach((element) => {
      const {
        title,
        titulo,
        date,
        fecha,
        coordinates,
        images,
        direction,
        direccion,
        size,
        scope,
        alcance,
        credits,
        creditos,
        content,
        contenido,
        type,
        secondType,
        presentation,
      } = element.attributes
      const ourProject = {
        title,
        titulo,
        date,
        fecha,
        coordinates,
        images,
        direction,
        direccion,
        size,
        scope,
        alcance,
        credits,
        creditos,
        content,
        contenido,
        type,
        secondType,
        presentation,
      }
      allProjects.push(ourProject)
      if (type === 'Residential' || secondType === 'Residencial') {
        residentialProjects.push(ourProject)
      }
      if (type === 'Industrial' || secondType === 'Industrial') {
        industrialProjects.push(ourProject)
      }
      if (type === 'Educativo' || secondType === 'Educativo') {
        educationalProjects.push(ourProject)
      }
    })
    setProjectsArrs({
      all: formatProjects(allProjects),
      residential: formatProjects(residentialProjects),
      industrial: formatProjects(industrialProjects),
      educational: formatProjects(educationalProjects),
    })
    setShowProjects(formatProjects(allProjects))
  }, [])

  const choseOne = (
    i: number,
    setChosen: (i: number) => void,
    title: title | titulo,
    projecstArrs: ProjectsArrs,
    setShowProjects: (show: FormatArray) => void
  ) => {
    setChosen(i)
    if (title === 'Todas' || title === 'All') setShowProjects(projecstArrs.all)
    if (title === 'Residencial') setShowProjects(projecstArrs.residential)
    if (title === 'Industrial') setShowProjects(projecstArrs.industrial)
    if (title === 'Educativo' || title === 'Educational')
      setShowProjects(projecstArrs.educational)
  }

  const modalOut = useCallback((onClose: () => void) => {
    window.onclick = (event: MouseEvent) => {
      const target = event.target as Element
      const id = target.id
      if (id === 'box') {
        onClose()
      }
    }
  }, [])

  const setOurProjects = useCallback(
    (showProjects: FormatArray, setProjectss: (pro: Children[]) => void) => {
      const projectss: Children[] = []
      showProjects.forEach((project, i) => {
        const { first, second, third } = project

        if (first.content !== null) {
          const {
            title,
            titulo,
            images,
            date,
            fecha,
            direction,
            direccion,
            coordinates,
            size,
            scope,
            alcance,
            credits,
            creditos,
            content,
            contenido,
          } = first.content
          const { url } = images.data[0].attributes
          const img = generateImgSrc(url)
          const modalInfo: ProjectInfo = {
            images,
            date,
            fecha,
            direction,
            direccion,
            coordinates,
            size,
            scope,
            alcance,
            credits,
            creditos,
            content,
            contenido,
          }

          const element = (
            <OneCard
              key={i}
              title={title}
              titulo={titulo}
              img={img}
              modal={modalInfo}
            />
          )
          projectss.push(element)
        }

        if (second && second.secondContent !== null) {
          const {
            title,
            titulo,
            images,
            date,
            fecha,
            direction,
            direccion,
            coordinates,
            size,
            scope,
            alcance,
            credits,
            creditos,
            content,
            contenido,
          } = second.firstContent
          const {
            title: otherTitle,
            titulo: otroTitulo,
            images: otherImages,
            date: otherDate,
            fecha: otraFecha,
            direction: otherDirection,
            direccion: otraDireccion,
            coordinates: otherCoordinates,
            size: otherSize,
            scope: otherScope,
            alcance: otroAlcance,
            credits: otherCredits,
            creditos: otrosCreditos,
            content: otherContent,
            contenido: otroContenido,
          } = second.secondContent
          const { url } = images.data[0].attributes
          const { url: otherUrl } = otherImages.data[0].attributes
          const img = generateImgSrc(url)
          const otherImg = generateImgSrc(otherUrl)
          const modalInfo: ProjectInfo = {
            images,
            date,
            fecha,
            direction,
            direccion,
            coordinates,
            size,
            scope,
            alcance,
            credits,
            creditos,
            content,
            contenido,
          }
          const otherModalInfo: ProjectInfo = {
            images: otherImages,
            date: otherDate,
            fecha: otraFecha,
            direction: otherDirection,
            direccion: otraDireccion,
            coordinates: otherCoordinates,
            size: otherSize,
            scope: otherScope,
            alcance: otroAlcance,
            credits: otherCredits,
            creditos: otrosCreditos,
            content: otherContent,
            contenido: otroContenido,
          }
          const element = (
            <TwoCards
              key={i + 3.14}
              title={title}
              titulo={titulo}
              img={img}
              secondTitle={otherTitle}
              segundoTitulo={otroTitulo}
              secondImg={otherImg}
              modal={modalInfo}
              otherModal={otherModalInfo}
            />
          )
          projectss.push(element)
        }

        if (
          third &&
          third.secondContent !== null &&
          third.thirdContent !== null
        ) {
          const {
            title,
            titulo,
            images,
            date,
            fecha,
            direction,
            direccion,
            coordinates,
            size,
            scope,
            alcance,
            credits,
            creditos,
            content,
            contenido,
          } = third.firstContent
          const {
            title: otherTitle,
            titulo: otroTitulo,
            images: otherImages,
            date: otherDate,
            fecha: otraFecha,
            direction: otherDirection,
            direccion: otraDireccion,
            coordinates: otherCoordinates,
            size: otherSize,
            scope: otherScope,
            alcance: otroAlcance,
            credits: otherCredits,
            creditos: otrosCreditos,
            content: otherContent,
            contenido: otroContenido,
          } = third.secondContent
          const { url } = images.data[0].attributes
          const { url: otherUrl } = otherImages.data[0].attributes
          const {
            title: thirdTitle,
            titulo: tercerTitulo,
            images: thirdImages,
            date: thirdDate,
            fecha: terceraFecha,
            direction: thirdDirection,
            direccion: terceraDireccion,
            coordinates: thirdCoordinates,
            size: thirdSize,
            scope: thirdScope,
            alcance: tercerAlcance,
            credits: thirdCredits,
            creditos: tercerosCreditos,
            content: thirdContent,
            contenido: tercerContenido,
          } = third.thirdContent
          const { url: thirdUrl } = thirdImages.data[0].attributes
          const img = generateImgSrc(url)
          const otherImg = generateImgSrc(otherUrl)
          const thirdImg = generateImgSrc(thirdUrl)
          const modalInfo: ProjectInfo = {
            images,
            date,
            fecha,
            direction,
            direccion,
            coordinates,
            size,
            scope,
            alcance,
            credits,
            creditos,
            content,
            contenido,
          }
          const otherModalInfo: ProjectInfo = {
            images: otherImages,
            date: otherDate,
            fecha: otraFecha,
            direction: otherDirection,
            direccion: otraDireccion,
            coordinates: otherCoordinates,
            size: otherSize,
            scope: otherScope,
            alcance: otroAlcance,
            credits: otherCredits,
            creditos: otrosCreditos,
            content: otherContent,
            contenido: otroContenido,
          }
          const lastModalInfo: ProjectInfo = {
            images: thirdImages,
            date: thirdDate,
            fecha: terceraFecha,
            direction: thirdDirection,
            direccion: terceraDireccion,
            coordinates: thirdCoordinates,
            size: thirdSize,
            scope: thirdScope,
            alcance: tercerAlcance,
            credits: thirdCredits,
            creditos: tercerosCreditos,
            content: thirdContent,
            contenido: tercerContenido,
          }

          const element = (
            <ThreeCards
              key={i + 3.13}
              title={title}
              titulo={titulo}
              img={img}
              secondTitle={otherTitle}
              segundoTitulo={otroTitulo}
              secondImg={otherImg}
              thirdTitle={thirdTitle}
              tercerTitulo={tercerTitulo}
              thirdImg={thirdImg}
              modal={modalInfo}
              otherModal={otherModalInfo}
              lastModal={lastModalInfo}
            />
          )
          projectss.push(element)
        }
      })
      setProjectss(projectss)
    },
    []
  )

  return { getProjectsInfo, choseOne, modalOut, setOurProjects }
}

export default useProjectsFunctions
