import React from 'react'
import { useQuery } from '@apollo/client'
import style from './style.module.scss'
import MobileFooter from './MobileFooter'
import DesktopFooter from './DesktopFooter'
import { GET_FOOTER_INFO } from '@/queries'
import { useFunctions } from '@/hooks'
import { type Directions, type Socials } from './Types'
import { useBearStore } from '@/store'

const Footer = () => {
  const { loading, error, data } = useQuery(GET_FOOTER_INFO)
  const { generateImgSrc } = useFunctions()
  const { lang } = useBearStore()

  if (loading) return
  if (error) return

  const footerInfo = data.footer.data.attributes
  const {
    Logo,
    Button,
    Tecla,
    phone,
    address,
    mail,
    firstSocial,
    secondSocial,
    thirdSocial,
  } = footerInfo
  const { url, alternativeText } = Logo.data.attributes
  const { title: phoneTitle, image: phoneImg, titulo: tituloTelefono } = phone
  const { url: phoneUrl, alternativeText: phoneImgText } =
    phoneImg.data.attributes
  const {
    title: addressTitle,
    image: addressImg,
    titulo: tituloDireccion,
  } = address
  const { url: addressUrl, alternativeText: addressImgText } =
    addressImg.data.attributes
  const { title: mailTitle, image: mailImg, titulo: tituloCorreo } = mail
  const { url: mailUrl, alternativeText: mailImgText } = mailImg.data.attributes
  const {
    title: firstSocialTitle,
    image: firstSocialImg,
    link: firstSocialLink,
    titulo: tituloPrimeraRed,
  } = firstSocial
  const { url: firstSocialUrl, alternativeText: firstSocialAltText } =
    firstSocialImg.data.attributes
  const {
    title: secondSocialTitle,
    image: secondSocialImg,
    link: secondSocialLink,
    titulo: tituloSegundaRed,
  } = secondSocial
  const { url: secondSocialUrl, alternativeText: secondSocialAltText } =
    secondSocialImg.data.attributes
  const {
    title: thirdSocialTitle,
    image: thirdSocialImg,
    link: thirdSocialLink,
    titulo: tituloTerceraRed,
  } = thirdSocial
  const { url: thirdSocialUrl, alternativeText: thirdSocialAltText } =
    thirdSocialImg.data.attributes

  const logo = {
    url: generateImgSrc(url),
    altText: alternativeText,
  }
  const directions: Directions = {
    phone: {
      title: lang === 'en' ? phoneTitle : tituloTelefono,
      url: generateImgSrc(phoneUrl),
      altText: phoneImgText,
    },
    address: {
      title: lang === 'en' ? addressTitle : tituloDireccion,
      url: generateImgSrc(addressUrl),
      altText: addressImgText,
    },
    mail: {
      title: lang === 'en' ? mailTitle : tituloCorreo,
      url: generateImgSrc(mailUrl),
      altText: mailImgText,
    },
  }

  const socials: Socials = {
    firstSocial: {
      title: lang === 'en' ? firstSocialTitle : tituloPrimeraRed,
      url: generateImgSrc(firstSocialUrl),
      altText: firstSocialAltText,
      link: firstSocialLink,
    },
    secondSocial: {
      title: lang === 'en' ? secondSocialTitle : tituloSegundaRed,
      url: generateImgSrc(secondSocialUrl),
      altText: secondSocialAltText,
      link: secondSocialLink,
    },
    thirdSocial: {
      title: lang === 'en' ? thirdSocialTitle : tituloTerceraRed,
      url: generateImgSrc(thirdSocialUrl),
      altText: thirdSocialAltText,
      link: thirdSocialLink,
    },
  }

  return (
    <footer className={style.footer}>
      <MobileFooter
        logo={logo}
        addresses={directions}
        socialsNetworks={socials}
        button={lang === 'en' ? Button : Tecla}
      />
      <DesktopFooter
        logo={logo}
        addresses={directions}
        socialsNetworks={socials}
        button={lang === 'en' ? Button : Tecla}
      />
    </footer>
  )
}

export default Footer
