import React, { useState } from 'react'
import arrow from '/arrow-right.svg'
import { useBearStore } from '@/store'
import InputField from 'c/FormContact/Parts/Inputs/InputField'
import type { InputInfo } from 'c/FormContact'
import ErrorMessage from 'c/FormContact/Parts/ErrorMessage'
import TextAreaInput from 'c/FormContact/Parts/Inputs/TextAreaInput'
import type { SuccessScreen } from '@/pages/Page'
import SuccessScreenComponent from './SuccessScreen'

interface Props {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>
  back: string
  inspectionData: string
  total: string
  contactInfo: string
  inputName: InputInfo
  inputEmail: InputInfo
  inputTel: InputInfo
  textarea: InputInfo
  ConfirnInspection: string
  success: boolean
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>
  successScreen: SuccessScreen
}
const SendInspection = ({
  setIsSubmitted,
  back,
  inspectionData,
  total,
  contactInfo,
  inputName,
  inputEmail,
  inputTel,
  textarea,
  ConfirnInspection,
  success,
  setSuccess,
  successScreen,
}: Props) => {
  const [userReview, setUserReview] = useState({
    name: '',
    email: '',
    tlf: '',
  })
  const [activate, setActivate] = useState(false)
  const [errorMessage, setErrolMessage] = useState({
    name: '',
    email: '',
  })
  const [comment, setComment] = useState('')
  function validateEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserReview({ ...userReview, [name]: value })
    if (value) setErrolMessage({ ...errorMessage, [name]: '' })
    if (!value) setErrolMessage({ ...errorMessage, [name]: 'error' })
    if (name === 'email' && !validateEmail(value) && value)
      setErrolMessage({ ...errorMessage, [name]: 'error' })
  }
  const updateTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const {
    selectedDirection,
    inspectionDate,
    lang,
    inspections,
    directionPrice,
    totalPrice,
  } = useBearStore()

  const formatDate = (dateString: { en: string; es: string }) => {
    const parts =
      lang === 'en' ? dateString.en.split(' of ') : dateString.es.split(' de ')
    if (parts.length !== 2) return lang === 'en' ? dateString.en : dateString.es

    const [day, month] = parts
    return lang === 'en' ? `${day} ${month}` : `${day} ${month}`
  }

  const formattedDate = formatDate(inspectionDate)
  const totalToPay = totalPrice + directionPrice

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setActivate(true)
    const { name, email, tlf } = userReview
    if (!name || !email || !tlf || !comment) {
      //alert('Please enter all the form field!')
      return
    }
    setSuccess(true)
  }

  return (
    <div className='w-[90%] max-w-[1400px] mx-auto my-10 z-30 relative'>
      {!success && (
        <>
          <div
            className='flex gap-3 mb-8 cursor-pointer'
            onClick={() => setIsSubmitted(false)}
          >
            <img className='w-8 md:w-10' src={arrow} alt='arrow-right' />
            <p className='text-white font-bold md:font-black text-4xl md:text-5xl'>
              {back}
            </p>
          </div>
          <div className='w-full bg-white text-blackS3 rounded-3xl pt-8 pb-10 px-4 md:px-6 shadow-calendar text-left'>
            <h3 className='text-4xl md:text-5xl mb-5 font-black'>
              {inspectionData}
            </h3>
            <h4 className='text-2xl md:text-3xl mb-5 font-semibold'>
              {selectedDirection.province}, {selectedDirection.cantons},{' '}
              {selectedDirection.districts}{' '}
              <span className='ml-4'>{formattedDate}</span>
            </h4>
            {inspections.map((inspection, i) => {
              const { title, titulo, engineer, choosen, price } = inspection

              return (
                <h4
                  className='text-2xl md:text-3xl mb-5 font-semibold w-full flex justify-between'
                  key={i}
                >
                  <span>
                    {lang === 'en' ? title : titulo}{' '}
                    {!isNaN(choosen) && (
                      <span className='ml-4 text-[#78797A] font-light'>
                        {engineer[choosen].name}
                      </span>
                    )}
                  </span>
                  <span>$ {price + directionPrice / inspections.length}</span>
                </h4>
              )
            })}
            <div className='w-full mb-6 bg-blackS3 h-[1.5px]'></div>
            <h4 className='text-2xl md:text-3xl mb-16 font-semibold w-full flex justify-between'>
              <span>{total}</span>{' '}
              <span className='text-3xl md:text-4xl font-bold'>
                $ {totalToPay}
              </span>
            </h4>
            <form className='w-full' onSubmit={handleSubmit}>
              <legend className='text-3xl md:text-4xl mb-8 font-black'>
                {contactInfo}
              </legend>
              <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='w-full md:w-[90%]'>
                  <label
                    className='font-semibold text-3xl mb-5 block'
                    htmlFor='name'
                  >
                    {inputName.name}{' '}
                  </label>
                  <InputField
                    error={errorMessage.name}
                    type='text'
                    name='name'
                    value={userReview.name}
                    placeholder={inputName.placeholder}
                    onChange={handleChange}
                    lp
                  />
                  <ErrorMessage
                    activate={
                      activate && (errorMessage.name || !userReview.name)
                        ? true
                        : false
                    }
                    message={
                      lang === 'en'
                        ? 'The field name is mandatory'
                        : 'El campo de nombre es obligatorio'
                    }
                  />
                  <label
                    className='font-semibold text-3xl mb-5 block'
                    htmlFor='email'
                  >
                    {inputEmail.name}
                  </label>
                  <InputField
                    error={activate ? errorMessage.email : ''}
                    type='email'
                    name='email'
                    value={userReview.email}
                    placeholder={inputEmail.placeholder}
                    onChange={handleChange}
                    lp
                  />
                  <ErrorMessage
                    activate={
                      activate && (errorMessage.email || !userReview.email)
                        ? true
                        : false
                    }
                    message={
                      !userReview.email
                        ? lang === 'en'
                          ? 'The filed email is mandatory'
                          : 'El campo de email es obligatorio'
                        : lang === 'en'
                        ? 'The email format is wrong'
                        : 'El formato de correo esta mal'
                    }
                  />
                  <label
                    className='font-semibold text-3xl mb-5 block'
                    htmlFor='tel'
                  >
                    {inputTel.name}
                  </label>
                  <InputField
                    type='tel'
                    name='tlf'
                    value={userReview.tlf}
                    placeholder={inputTel.placeholder}
                    onChange={handleChange}
                    lp
                  />
                </div>
                <div className='w-full md:w-[90%]'>
                  <label
                    className='font-semibold text-3xl mb-5 block'
                    htmlFor='name'
                  >
                    {textarea.name}{' '}
                  </label>
                  <TextAreaInput
                    name={textarea.name}
                    placeholder={textarea.placeholder}
                    value={comment}
                    onChange={updateTextArea}
                    error={activate ? (comment ? '' : 'error') : ''}
                    maxHeight
                  />
                </div>
              </div>
              <div className='w-full flex justify-center'>
                <button
                  className='bg-blackS3 text-white px-3 py-5 text-xl md:text-2xl font-bold rounded-lg mt-12 mb-8'
                  type='submit'
                >
                  {ConfirnInspection}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      {success && <SuccessScreenComponent successScreen={successScreen} />}
    </div>
  )
}
export default SendInspection
