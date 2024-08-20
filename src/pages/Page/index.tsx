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
import Inspections from 'c/Inspections'
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

export interface SuccessScreen {
  title: string
  titulo: string
  subtitle: string
  subtitulo: string
  goldIcon: ImageStrapi
  back: string
  volver: string
  another: string
  otra: string
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
  bgImage: ImageStrapi
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
  scheduleTitle: string
  tituloHorario: string
  addInspection: string
  agregarInspeccion: string
  address: string
  direction: string
  reserve: string
  reservar: string
  inspectionDate: string
  fechaInspeccion: string
  ofertas: string
  offers: string
  ofertasPlaceholder: string
  offersPlaceholder: string
  selectStaff: string
  seleccionarPersonal: string
  allStaff: string
  todoPersonal: string
  totalPrice: string
  precioTotal: string
  Calendar: string
  Calendario: string
  dateBtn: string
  fechaBtn: string
  confirmation: string
  confirmacion: string
  back: string
  volver: string
  inspectionData: string
  datosInspeccion: string
  totalEn: string
  totalEs: string
  contactInfo: string
  infoContacto: string
  Email: InputInfo
  TelefonoInspeccion: InputInfo
  ConfirnInspection: string
  ConfirmarInspeccion: string
  bgConfirmation: ImageStrapi
  successScreen: SuccessScreen
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
    if (component.__typename === 'ComponentComponentInspectionsSection') {
      const {
        title,
        text,
        bgImage,
        texto,
        titulo,
        scheduleTitle,
        tituloHorario,
        addInspection,
        agregarInspeccion,
        address,
        direction,
        reserve,
        reservar,
        inspectionDate,
        fechaInspeccion,
        ofertas,
        offers,
        ofertasPlaceholder,
        offersPlaceholder,
        selectStaff,
        seleccionarPersonal,
        allStaff,
        todoPersonal,
        totalPrice,
        precioTotal,
        Calendar,
        Calendario,
        dateBtn,
        fechaBtn,
        confirmation,
        confirmacion,
        back,
        volver,
        inspectionData,
        datosInspeccion,
        totalEn,
        totalEs,
        contactInfo,
        infoContacto,
        Name,
        Nombre,
        Email,
        Correo,
        Phone,
        TextArea,
        AreaTexto,
        TelefonoInspeccion,
        ConfirnInspection,
        ConfirmarInspeccion,
        bgConfirmation,
        successScreen,
      } = component
      const element = (
        <Inspections
          key={i}
          title={title}
          text={text}
          bgImage={bgImage}
          texto={texto}
          titulo={titulo}
          tituloHorario={tituloHorario}
          scheduleTitle={scheduleTitle}
          addInspection={addInspection}
          agregarInspeccion={agregarInspeccion}
          address={address}
          direction={direction}
          reserve={reserve}
          reservar={reservar}
          inspectionDate={inspectionDate}
          fechaInspeccion={fechaInspeccion}
          ofertas={ofertas}
          offers={offers}
          ofertasPlaceholder={ofertasPlaceholder}
          offersPlaceholder={offersPlaceholder}
          selectStaff={selectStaff}
          seleccionarPersonal={seleccionarPersonal}
          allStaff={allStaff}
          todoPersonal={todoPersonal}
          totalPrice={totalPrice}
          precioTotal={precioTotal}
          Calendar={Calendar}
          Calendario={Calendario}
          dateBtn={dateBtn}
          fechaBtn={fechaBtn}
          confirmation={confirmation}
          confirmacion={confirmacion}
          back={back}
          volver={volver}
          inspectionData={inspectionData}
          datosInspeccion={datosInspeccion}
          totalEn={totalEn}
          totalEs={totalEs}
          contactInfo={contactInfo}
          infoContacto={infoContacto}
          Name={Name}
          Nombre={Nombre}
          Email={Email}
          Correo={Correo}
          Phone={Phone}
          TelefonoInspeccion={TelefonoInspeccion}
          TextArea={TextArea}
          AreaTexto={AreaTexto}
          ConfirnInspection={ConfirnInspection}
          ConfirmarInspeccion={ConfirmarInspeccion}
          bgConfirmation={bgConfirmation}
          successScreen={successScreen}
        />
      )
      elements.push(element)
    }
  })

  return <>{elements}</>
}

export default Page
