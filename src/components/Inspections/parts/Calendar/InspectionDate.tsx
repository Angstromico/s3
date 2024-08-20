import React, { useMemo } from 'react'
import { useBearStore } from '@/store'

interface Props {
  title: string
  offers: string
  offersPlaceholder: string
}

const InspectionDate = ({ title, offers, offersPlaceholder }: Props) => {
  const { inspectionDate, lang, totalPrice, directionPrice } = useBearStore()
  const total = totalPrice + directionPrice

  const dayAndMonth = useMemo(() => {
    if (!inspectionDate) return [null, null]

    const inspectionLang = lang === 'en' ? inspectionDate.en : inspectionDate.es

    const dateParts = inspectionLang.split(' ')
    if (dateParts.length < 3) return [null, null]

    const day = parseInt(dateParts[0])
    const month = dateParts[2]

    return [day, month]
  }, [inspectionDate, lang])

  const Card = ({ bg }: { bg: string }) => {
    return (
      <div
        className='rounded-xl px-12 py-6 text-center'
        style={{ backgroundColor: bg }}
      >
        <h3 className='text-5xl font-black mb-1'>{dayAndMonth[0]}</h3>
        <p className='text-xl mb-4'>{dayAndMonth[1]}</p>
        <p
          className='mb-1 text-grayS3 font-light line-through text-xl'
          style={{ textDecorationColor: '#D83434' }}
        >
          ${total + 200}
        </p>
        <p className='font-bold text-2xl'>${total}</p>
      </div>
    )
  }

  const colors = ['#D3BC2A', '#e7dd99', '#e7dd99', '#f6f2d6']

  return (
    <div className='w-[90%] max-w-[1400px] mx-auto mt-32 mb-6 text-left'>
      <h3 className='text-blackS3 text-left text-xl sm:text-2xl md:text-3xl  font-swiss721-black font-bold my-8'>
        {title}
      </h3>
      <p className='text-lg sm:text-xl md:text-2xl my-6 gap-3 flex'>
        <span className='font-bold text-blackS3'>{offers}</span>
        <span className='text-[#787878] font-light'>{offersPlaceholder}</span>
      </p>
      <div className='flex gap-3 flex-wrap'>
        {colors.map((color, i) => (
          <Card key={i} bg={color} />
        ))}
      </div>
    </div>
  )
}

export default InspectionDate
