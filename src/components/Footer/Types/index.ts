export interface Logo {
  url: string
  altText: string
}

export interface IconsInfo extends Logo {
  title: string
  link?: string
}

export interface Directions {
  phone: IconsInfo
  address: IconsInfo
  mail: IconsInfo
}

export interface Socials {
  firstSocial: IconsInfo
  secondSocial: IconsInfo
  thirdSocial: IconsInfo
}

export interface FooterInfo {
  logo: Logo
  addresses: Directions
  socialsNetworks: Socials
  button: string
}
