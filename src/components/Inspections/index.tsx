import React, { useState, useEffect } from 'react'
import type { ImageStrapi } from '@/types'
import { useFunctions } from '@/hooks'
import { useBearStore } from '@/store'
import IntroSection from './parts/IntroSection'
import EngineersGrid from '../EngineersGrid'
import Scheduled from './parts/Schedule'
import Directions from '../Directions'
import CalendarInspection from './parts/Calendar'
import type { InputInfo } from '../FormContact'
import SendInspection from './parts/SendInspection'
import type { SuccessScreen } from '@/pages/Page'

interface InspectionsInfo {
  bgImage: ImageStrapi
  title: string
  titulo: string
  text: string
  texto: string
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
  Name: InputInfo
  Nombre: InputInfo
  Email: InputInfo
  Correo: InputInfo
  Phone: InputInfo
  TextArea: InputInfo
  AreaTexto: InputInfo
  TelefonoInspeccion: InputInfo
  ConfirnInspection: string
  ConfirmarInspeccion: string
  bgConfirmation: ImageStrapi
  successScreen: SuccessScreen
}
const Inspections = ({
  bgImage,
  text,
  title,
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
}: InspectionsInfo) => {
  const { generateImgSrc } = useFunctions()
  const { lang, inspections, selectedDirection } = useBearStore()
  const [scheduled, setScheduled] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [success, setSuccess] = useState(false)

  const changeSchedule = () => setScheduled(!scheduled)

  const bgImg = generateImgSrc(bgImage.data.attributes.url, true)
  const bgSubmitted = generateImgSrc(bgConfirmation.data.attributes.url, true)

  useEffect(() => {
    const { province, cantons, districts } = selectedDirection
    if (province && cantons && districts) {
      setIsSelected(true)
    }
  }, [selectedDirection])

  return (
    <section
      className={`mainContainerAboutUs pt-36 lg:pt-16 w-full bg-gradient-to-b from-black via-white to-transparent pb-96 ${
        !success ? 'md:pb-[30rem]' : 'md:pb-[38rem] mb-96 md:mb-0'
      }`}
    >
      <IntroSection
        title={
          lang === 'en'
            ? isSubmitted
              ? confirmation
              : title
            : isSubmitted
            ? confirmacion
            : titulo
        }
        text={lang === 'en' ? text : texto}
        bgImg={bgImg}
        scheduled={scheduled}
        isSubmitted={isSubmitted}
        bgSubmitted={bgSubmitted}
        success={success}
      />
      {!scheduled && inspections.length < 1 && (
        <EngineersGrid changeSchedule={changeSchedule} />
      )}
      {scheduled && inspections.length > 0 && !isSubmitted && (
        <>
          <Scheduled
            changeSchedule={changeSchedule}
            title={lang === 'en' ? scheduleTitle : tituloHorario}
            selectedPhrase={lang === 'en' ? reserve : reservar}
            AddInspections={lang === 'en' ? addInspection : agregarInspeccion}
          />
          <div className='w-[90%] max-w-[1400px] mx-auto my-12 text-left'>
            <h2 className='text-blackS3 text-left text-xl sm:text-2xl md:text-3xl  font-swiss721-black font-bold my-8'>
              {lang === 'en' ? address : direction}
            </h2>
            <Directions
              province={lang === 'en' ? 'Province' : 'Provincia'}
              cantons={lang === 'en' ? 'Canton' : 'Cantón'}
              districts={lang === 'en' ? 'Districts' : 'Districtos'}
            />
          </div>
          {isSelected && (
            <CalendarInspection
              title={lang === 'en' ? Calendar : Calendario}
              moreStaff={lang === 'en' ? selectStaff : seleccionarPersonal}
              more={lang === 'en' ? allStaff : todoPersonal}
              totalPrice={lang === 'en' ? totalPrice : precioTotal}
              dateBtn={lang === 'en' ? dateBtn : fechaBtn}
              inspectionDate={lang === 'en' ? inspectionDate : fechaInspeccion}
              offers={lang === 'en' ? offers : ofertas}
              offersPlaceholder={
                lang === 'en' ? offersPlaceholder : ofertasPlaceholder
              }
              setIsSubmitted={setIsSubmitted}
            />
          )}
        </>
      )}
      {isSubmitted && (
        <SendInspection
          setIsSubmitted={setIsSubmitted}
          back={lang === 'en' ? back : volver}
          inspectionData={lang === 'en' ? inspectionData : datosInspeccion}
          total={lang === 'en' ? totalEn : totalEs}
          contactInfo={lang === 'en' ? contactInfo : infoContacto}
          inputName={lang === 'en' ? Name : Nombre}
          inputEmail={lang === 'en' ? Email : Correo}
          inputTel={lang === 'en' ? Phone : TelefonoInspeccion}
          textarea={lang === 'en' ? TextArea : AreaTexto}
          ConfirnInspection={
            lang === 'en' ? ConfirnInspection : ConfirmarInspeccion
          }
          success={success}
          setSuccess={setSuccess}
          successScreen={successScreen}
        />
      )}
    </section>
  )
}
export default Inspections
