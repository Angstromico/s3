import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_INSPECTIONS } from '@/queries'
import type { ImageStrapi } from '@/types'
import type { Inspections } from '@/store'
import { useBearStore } from '@/store'
import { useFunctions } from '@/hooks'

interface EngineerCard {
  title: string
  titulo: string
  price: number
  img: ImageStrapi
  engineer: { name: string }[]
}

interface Props {
  changeSchedule: () => void
}

type DataQuery = { attributes: EngineerCard }[]
const EngineersGrid = ({ changeSchedule }: Props) => {
  const { loading, error, data } = useQuery(GET_INSPECTIONS)
  const { lang, setInspections } = useBearStore()
  const { generateImgSrc } = useFunctions()

  const setSchedule = (inspections: Inspections) => {
    changeSchedule()
    setInspections(inspections)
  }

  if (loading || error) return

  const engineerData: DataQuery = data.inspections.data

  return (
    <div className='max-w-[1500px] justify-center items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full sm:w-[80%] lg:w-full mx-auto px-2'>
      {engineerData.map((eng, i) => {
        const { title, titulo, img, engineer, price } = eng.attributes
        const { url, alternativeText } = img.data.attributes
        const imgUrl = generateImgSrc(url, true)

        const inspection = {
          title,
          titulo,
          engineer,
          price,
        }

        return (
          <div
            key={i}
            className='w-full flex flex-row sm:flex-col justify-center rounded-lg text-left gap-5 bg-white cursor-pointer shadow-xl z-50'
            onClick={() => setSchedule(inspection)}
          >
            <div className='flex-grow flex flex-col w-[40%] sm:w-full'>
              <img
                className='rounded-lg w-full h-full object-cover'
                src={imgUrl}
                alt={alternativeText}
              />
            </div>
            <div className='w-[60%] sm:w-full pt-4 px-4 pb-16'>
              <h3 className='font-bold text-2xl sm:text-3xl md:text-4xl'>
                {lang === 'en' ? title : titulo}
              </h3>
              <div className='h-[1.2px] bg-black w-[40%] min-w-[100px] my-5'></div>
              {engineer.map((eng, j) => {
                const { name } = eng

                return (
                  <p className='my-3' key={j}>
                    {name}
                  </p>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default EngineersGrid
