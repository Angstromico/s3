import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PAGE_INFO } from '@/queries'
import { useFunctions } from '@/hooks'
import HeroBanner from 'c/HeroBanner'
import FormContact from 'c/FormContact'
import BlogSection from 'c/BlogSection'
import AboutUs from 'c/AboutUs'
import WorkingSteps from 'c/WorkingSteps'
import AboutProject from 'c/AboutProject'
import ProjectsSection from 'c/ProjectsSection'
import ProjectsIntro from 'c/ProjectsIntro'
import { type TextContent } from '@/types'
import { type TypeName, type ImageStrapi, type OptionProject } from '@/types'
import { type InputInfo } from 'c/FormContact'
import { type NumbersInfo } from 'c/AboutUs/Parts/NumbersSection'
import { useBearStore } from '@/store'

type langInfo = string | string[] | NumbersInfo[] | StepsInfo[] | InputInfo

interface PageInfo {
  iDInfo: string
}

export interface StepsInfo extends TextContent {
  image: ImageStrapi
}
interface PageComponets extends TextContent {
  __typename: TypeName
  FixText: string
  textoFijo: string
  HeroImage: ImageStrapi
  groupText: { text: string }[]
  grupoTextos: { text: string }[]
  image: ImageStrapi
  Name: InputInfo
  Nombre: InputInfo
  Mail: InputInfo
  Correo: InputInfo
  Phone: InputInfo
  Telefono: InputInfo
  TextArea: InputInfo
  AreaTexto: InputInfo
  BtnText: string
  TextoBtn: string
  read: string
  leer: string
  readMore: string
  leerMas: string
  firstContent: string
  primerContenido: string
  secondContent: string
  segundoContenido: string
  bgImg: ImageStrapi
  workTitle: string
  tituloTrabajo: string
  card: NumbersInfo[]
  tarjeta: NumbersInfo[]
  resume: string
  resumen: string
  logo: ImageStrapi
  Steps: StepsInfo[]
  Pasos: StepsInfo[]
  option: OptionProject[]
  errorName: string
  errorNombre: string
  errorMail: string
  errorCorreo: string
  errorMessage: string
  errorMensaje: string
  errorMailFormat: string
  errorFormatoCorreo: string
}

const Page = ({ iDInfo }: PageInfo) => {
  const { loading, error, data } = useQuery(GET_PAGE_INFO(iDInfo))
  const { generateImgSrc } = useFunctions()
  let elements: React.ReactElement[] = []
  const { lang } = useBearStore()

  const getLang = (en: langInfo, es: langInfo) => {
    if (lang === 'en') return en
    if (lang === 'es-CR') return es
  }

  if (loading) return
  if (error) return <p>...error</p>

  const pageInfo = data.pag.data.attributes.PageInfo

  pageInfo.forEach((component: PageComponets, i: number) => {
    if (component.__typename === 'ComponentComponentHeroBanner') {
      const texts: string[] = []
      const textos: string[] = []
      component.groupText.forEach((text) => {
        texts.push(text.text)
      })
      component.grupoTextos.forEach((text) => {
        textos.push(text.text)
      })
      const element = (
        <HeroBanner
          key={i}
          bgImg={generateImgSrc(component.HeroImage.data.attributes.url)}
          lyrics={getLang(texts, textos)}
          fixText={getLang(component.FixText, component.textoFijo)}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentComponentForm') {
      const {
        image,
        title,
        titulo,
        subtitle,
        subtitulo,
        Name,
        Nombre,
        Mail,
        Correo,
        Phone,
        Telefono,
        TextArea,
        AreaTexto,
        BtnText,
        TextoBtn,
        errorName,
        errorNombre,
        errorMail,
        errorCorreo,
        errorMessage,
        errorMensaje,
        errorMailFormat,
        errorFormatoCorreo,
      } = component
      const { url } = image.data.attributes

      const element = (
        <FormContact
          bgImg={generateImgSrc(url)}
          title={getLang(title, titulo)}
          subtitle={getLang(subtitle, subtitulo)}
          inputName={getLang(Name, Nombre)}
          inputEmail={getLang(Mail, Correo)}
          inputTel={getLang(Phone, Telefono)}
          textarea={getLang(TextArea, AreaTexto)}
          btnText={getLang(BtnText, TextoBtn)}
          errorName={errorName}
          errorNombre={errorNombre}
          errorMail={errorMail}
          errorCorreo={errorCorreo}
          errorMessage={errorMessage}
          errorMensaje={errorMensaje}
          errorMailFormat={errorMailFormat}
          errorFormatoCorreo={errorFormatoCorreo}
          key={i}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutShowBlog') {
      const {
        title,
        titulo,
        subtitle,
        subtitulo,
        read,
        leer,
        readMore,
        leerMas,
      } = component

      const element = (
        <BlogSection
          title={getLang(title, titulo)}
          subtitle={getLang(subtitle, subtitulo)}
          read={getLang(read, leer)}
          readAll={getLang(readMore, leerMas)}
          key={i}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentComponentAboutUs') {
      const {
        bgImg,
        title,
        titulo,
        firstContent,
        primerContenido,
        secondContent,
        segundoContenido,
        workTitle,
        tituloTrabajo,
        resume,
        resumen,
        logo,
        card,
        tarjeta,
      } = component
      const aboutInfo = {
        bgImg: bgImg.data.attributes.url,
        title: getLang(title, titulo),
        firstContent: getLang(firstContent, primerContenido),
        secondContent: getLang(secondContent, segundoContenido),
        bottomTitle: getLang(workTitle, tituloTrabajo),
      }
      const element = (
        <AboutUs
          key={i}
          aboutInfo={aboutInfo}
          logoTitle={getLang(resume, resumen)}
          logo={logo}
          numbersInfo={getLang(card, tarjeta)}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentComponentWorkingStep') {
      const { Steps, Pasos } = component
      const element = <WorkingSteps key={i} steps={getLang(Steps, Pasos)} />
      elements.push(element)
    }
    if (component.__typename === 'ComponentComponentAboutProject') {
      const { title, content, otherContent, titulo, contenido, otroContenido } =
        component
      const element = (
        <AboutProject
          key={i}
          title={getLang(title, titulo)}
          content={getLang(content, contenido)}
          otherContent={getLang(otherContent, otroContenido)}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentComponentProjectsSection') {
      const { title, titulo, readMore, leerMas } = component
      const element = (
        <ProjectsSection
          key={i}
          title={getLang(title, titulo)}
          content={getLang(readMore, leerMas)}
        />
      )
      elements.push(element)
    }
    if (component.__typename === 'ComponentLayoutOptions') {
      const { title, titulo, option } = component
      const element = (
        <ProjectsIntro key={i} title={getLang(title, titulo)} option={option} />
      )
      elements.push(element)
    }
  })

  return <>{elements}</>
}

export default Page
