import React, { useEffect, useState } from 'react'
import { useBearStore } from '@/store'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { addDays, format, subDays } from 'date-fns'
import { es } from 'date-fns/locale'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import InspectionHours from './InspectionHours'
import BottomCalendar from './BottomCalendar'
import InspectionDate from './InspectionDate'

interface Props {
  title: string
  moreStaff: string
  more: string
  totalPrice: string
  dateBtn: string
  offers: string
  offersPlaceholder: string
  inspectionDate: string
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

const CalendarInspection = ({
  title,
  moreStaff,
  more,
  totalPrice,
  dateBtn,
  offers,
  offersPlaceholder,
  inspectionDate,
  setIsSubmitted,
}: Props) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [textdate, setTextdate] = useState('')
  const { lang, setInspectionDate } = useBearStore()

  const getTodayDate = () => {
    const isEnglish = lang === 'en'
    const day = selectedDate.getDate()
    const month = selectedDate.getMonth() // getMonth() returns 0-indexed month

    const monthsEnglish = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const monthsSpanish = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ]

    const monthName = isEnglish ? monthsEnglish[month] : monthsSpanish[month]
    const formattedDate = isEnglish
      ? `${day} of ${monthName}`
      : `${day} de ${monthName}`

    const inspectionDate = {
      en: `${day} of ${monthsEnglish[month]}`,
      es: `${day} de ${monthsSpanish[month]}`,
    }

    setInspectionDate(inspectionDate)

    return formattedDate
  }

  useEffect(() => {
    const todayDate = getTodayDate()
    setTextdate(todayDate)
  }, [selectedDate])

  const customHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => {
    const isEnglish = lang === 'en'
    const monthName = isEnglish
      ? format(date, 'MMMM')
      : format(date, 'MMMM', { locale: es })
    const day = format(date, 'd')
    const formattedDate = isEnglish
      ? `${day} of ${monthName}`
      : `${day} de ${monthName}`

    const decreaseDay = () =>
      setSelectedDate((prevDate) => subDays(prevDate, 1))
    const increaseDay = () =>
      setSelectedDate((prevDate) => addDays(prevDate, 1))

    return (
      <div className='flex items-center justify-start gap-3 mb-7'>
        <div className='ml-8 flex gap-2'>
          <button
            type='button'
            onClick={decreaseDay}
            disabled={
              format(subDays(date, 1), 'yyyy-MM-dd') <
              format(new Date(), 'yyyy-MM-dd')
            }
            className={`text-xl ${
              format(subDays(date, 1), 'yyyy-MM-dd') <
              format(new Date(), 'yyyy-MM-dd')
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-black cursor-pointer'
            }`}
          >
            &lt;
          </button>
          <button
            type='button'
            onClick={increaseDay}
            className='text-xl text-black cursor-pointer'
          >
            &gt;
          </button>
        </div>
        <h6 className='text-lg'>{formattedDate}</h6>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This adds a smooth scrolling effect
    })
  }

  return (
    <>
      <InspectionDate
        title={inspectionDate}
        offers={offers}
        offersPlaceholder={offersPlaceholder}
      />
      <form
        onSubmit={handleSubmit}
        className='w-[90%] max-w-[1400px] mx-auto mt-32 mb-6 text-left'
      >
        <h3 className='text-blackS3 font-black text-lg sm:text-xl md:text-2xl'>
          {title}
        </h3>
        <div className='my-6 w-full shadow-calendar rounded-lg px-2 sm:px-3 pt-5 py-8 bg-white'>
          <h5 className='text-center text-md sm:text-lg md:text-xl mb-6'>
            {textdate}
          </h5>
          <div className='flex flex-col sm:flex-row-reverse w-full gap-8 sm:gap-16 md:gap-32 py-12'>
            <div className='w-full mx-auto px-12 sm:px-5'>
              {/* <h6 className='text-lg mt-5'>{moreStaff}</h6> */}
              {/* <SelectStaff
              selected={option}
              options={uniqueEngineerNames}
              setOption={setOption}
            /> */}
              <InspectionHours />
            </div>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
              renderCustomHeader={customHeader}
              locale={lang === 'en' ? undefined : es}
              dayClassName={(date) =>
                format(date, 'yyyy-MM-dd') ===
                format(selectedDate, 'yyyy-MM-dd')
                  ? 'bg-yellow-500 text-white rounded-full'
                  : format(date, 'yyyy-MM-dd') <
                    format(new Date(), 'yyyy-MM-dd')
                  ? 'text-gray-400'
                  : ''
              }
              calendarClassName='w-full text-md sm:text-lg md:text-xl max-w-2xl mx-auto border-none my-6'
            />
          </div>
        </div>
        <BottomCalendar totalPriceText={totalPrice} submitBtnText={dateBtn} />
      </form>
    </>
  )
}
export default CalendarInspection
