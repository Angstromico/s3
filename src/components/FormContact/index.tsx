import React, { useState } from 'react'
import FormContainer from './Parts/FormContainer'
import InputField from './Parts/Inputs/InputField'
import TextAreaInput from './Parts/Inputs/TextAreaInput'
import ErrorMessage from './Parts/ErrorMessage'
import ButtonInput from './Parts/Inputs/ButtonInput'
import { useBearStore } from '@/store'
import { sendContactMail } from '@/api'

export interface InputInfo {
  name: string
  placeholder: string
}

interface FormInfo {
  bgImg: string
  title: string
  subtitle: string
  inputName: InputInfo
  inputEmail: InputInfo
  inputTel: InputInfo
  textarea: InputInfo
  btnText: string
  errorName: string
  errorNombre: string
  errorMail: string
  errorCorreo: string
  errorMessage: string
  errorMensaje: string
  errorMailFormat: string
  errorFormatoCorreo: string
}

const FormContact = ({
  bgImg,
  title,
  subtitle,
  inputName,
  inputEmail,
  inputTel,
  textarea,
  btnText,
  errorName,
  errorNombre,
  errorMail,
  errorCorreo,
  errorMessage: MessageError,
  errorMensaje,
  errorMailFormat,
  errorFormatoCorreo,
}: FormInfo) => {
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
  const { lang } = useBearStore()

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setActivate(true)
    const { name, email, tlf } = userReview
    if (!name || !email || !tlf || !comment)
      alert('Please enter all the form field!')
    const templateParams = {
      user_name: name,
      user_email: email,
      message: comment,
      phone: tlf,
    }

    await sendContactMail(JSON.stringify(templateParams, null, 1))
  }

  return (
    <FormContainer
      bgImg={bgImg}
      title={title}
      subtitle={subtitle}
      handleSubmit={handleSubmit}
    >
      <InputField
        error={errorMessage.name}
        type='text'
        name={inputName.name}
        value={userReview.name}
        placeholder={inputName.placeholder}
        onChange={handleChange}
      />
      <ErrorMessage
        activate={
          activate && (errorMessage.name || !userReview.name) ? true : false
        }
        message={lang === 'en' ? errorName : errorNombre}
      />
      <InputField
        error={activate ? errorMessage.email : ''}
        type='email'
        name={inputEmail.name}
        value={userReview.email}
        placeholder={inputEmail.placeholder}
        onChange={handleChange}
      />
      <ErrorMessage
        activate={
          activate && (errorMessage.email || !userReview.email) ? true : false
        }
        message={
          !userReview.email
            ? lang === 'en'
              ? errorMail
              : errorCorreo
            : lang === 'en'
            ? errorMailFormat
            : errorFormatoCorreo
        }
      />
      <InputField
        type='tel'
        name={inputTel.name}
        value={userReview.tlf}
        placeholder={inputTel.placeholder}
        onChange={handleChange}
      />
      <TextAreaInput
        name={textarea.name}
        placeholder={textarea.placeholder}
        value={comment}
        onChange={updateTextArea}
        error={activate ? (comment ? '' : 'error') : ''}
      />
      <ErrorMessage
        activate={activate && !comment}
        message={lang === 'en' ? MessageError : errorMensaje}
      />
      <ButtonInput BtnText={btnText} />
    </FormContainer>
  )
}

export default FormContact
