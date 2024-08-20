export type Children = JSX.Element[] | JSX.Element
export interface ImageStrapi {
  data: {
    attributes: {
      url: string
      alternativeText?: string
    }
  }
}

export interface OptionProject {
  title: 'All' | 'Residential' | 'Industrial' | 'Educational'
  titulo: 'Todas' | 'Residencial' | 'Industrial' | 'Educativo'
}

export interface BlogAttributes {
  Title: string
  Titulo: string
  Date: string
  Fecha: string
  Author: string
  Autor: string
  LinkBlog: string
  Image?: ImageStrapi
  ExtraImg?: ImageStrapi
  url?: string
  altImg?: string
  Resume?: string
  Resumen?: string
  Content?: string
  Contenido?: string
  ExtraContent?: string
  ContenidoExtra?: string
  label?: string
  etiqueta?: string
  Icon?: ImageStrapi
}

export interface BlogInfo {
  attributes: BlogAttributes
}

export interface TextContent {
  title?: string
  titulo?: string
  content?: string
  contenido?: string
  subtitle?: string
  subtitulo?: string
  otherContent?: string
  otroContenido?: string
  text?: string
  texto?: string
}

export type TypeName =
  | 'ComponentComponentHeroBanner'
  | 'ComponentComponentForm'
  | 'ComponentLayoutShowBlog'
  | 'ComponentComponentAboutUs'
  | 'ComponentComponentWorkingStep'
  | 'ComponentComponentAboutProject'
  | 'ComponentComponentProjectsSection'
  | 'ComponentLayoutOptions'
  | 'ComponentComponentInspectionsSection'

type TypeProjects =
  | 'Residencial'
  | 'Industrial'
  | 'Educativo'
  | 'Residential'
  | 'Educational'

export interface ProjectInfo extends TextContent {
  date: string
  fecha: string
  coordinates: string
  images: {
    data: [
      {
        attributes: {
          url: string
        }
      }
    ]
  }
  direction: string
  direccion: string
  size: string
  scope: string
  alcance: string
  credits?: string
  creditos?: string
  type?: TypeProjects
  secondType?: TypeProjects
  presentation?: 'one' | 'two' | 'three'
}

export interface ProjectsAttributes {
  attributes: ProjectInfo
}

type OrderBy = { field: string }[]
export interface SearchBarBlog {
  orderBy: OrderBy
  ordenadoPor: OrderBy
  labelsTitle: string
  tituloEtiquetas: string
  labels: OrderBy
  etiquetas: OrderBy
  icon: ImageStrapi
  button: string
  boton: string
  title: string
  titulo: string
}

export type Lan = 'en' | 'es-CR'
