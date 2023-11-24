import React from 'react'
import { gql } from '@apollo/client'
import Page from '@/pages/Page'
import { Route } from 'react-router-dom'

export interface Pages {
  id: string
  attributes: {
    Title: string
    Link: string
  }
}

const pageCreation = (title: string, url: string, id: string) => {
  const page = <Route key={title} path={url} element={<Page iDInfo={id} />} />

  return page
}

const generatePage = (routes: React.ReactElement[], page: Pages) => {
  const { id, attributes } = page
  const { Title, Link } = attributes

  routes.push(pageCreation(Title, Link, id))
}

const GET_PAGES_INFO = gql`
  query {
    pags {
      data {
        id
        attributes {
          Title
          Link
        }
      }
    }
  }
`

const GET_HEADER_INFO = gql`
  query {
    header {
      data {
        attributes {
          Logo {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          Links {
            name
            link
            nombre
          }
        }
      }
    }
  }
`

const GET_FOOTER_INFO = gql`
  query {
    footer {
      data {
        attributes {
          Logo {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          Button
          Tecla
          phone {
            title
            titulo
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          address {
            title
            titulo
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          mail {
            title
            titulo
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
          }
          firstSocial {
            title
            titulo
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            link
          }
          secondSocial {
            title
            titulo
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            link
          }
          thirdSocial {
            title
            titulo
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            link
          }
        }
      }
    }
  }
`

const GET_PAGE_INFO = (id: string) => gql`
  query {
    pag(id: ${id}) {
      data {
        attributes {
          Title
          PageInfo {
            ... on ComponentComponentHeroBanner {
              HeroImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              FixText
              groupText {
                text
              }
              textoFijo
              grupoTextos {
                text 
              }
            }
            ... on ComponentComponentForm {
              title
              titulo
              subtitle
              subtitulo
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              Name {
                placeholder
                name
              }
              Nombre {
                placeholder
                name
              }
              Mail {
                placeholder
                name
              }
              Correo {
                placeholder
                name
              }
              Phone {
                placeholder
                name
              }
              Telefono {
                placeholder
                name
              }
              TextArea {
                placeholder
                name
              }
              AreaTexto {
                placeholder
                name
              }
              BtnText
              TextoBtn
              errorName
              errorNombre
              errorMail
              errorCorreo 
              errorMessage
              errorMensaje
              errorMailFormat
              errorFormatoCorreo
            }
            ... on ComponentLayoutShowBlog {
              title
              titulo
              subtitle
              subtitulo
              read
              leer
              readMore
              leerMas
            }
            ... on ComponentComponentAboutUs {
              title
              titulo 
              firstContent 
              primerContenido
              secondContent
              segundoContenido
              bgImg {
                data {
                  attributes {
                    url
                  }
                }
              }
              workTitle
              tituloTrabajo
              card {
                title 
                number 
                type 
              }
              tarjeta {
                title 
                number 
                type 
              }
              resume 
              resumen
              logo {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
            }
            ...on ComponentComponentWorkingStep {
            Steps {
              title 
              content 
              image {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
            }
            Pasos {
              title 
              content 
              image {
                data {
                  attributes {
                    url 
                    alternativeText
                  }
                }
              }
            }
          }
          ...on ComponentComponentAboutProject {
            title 
            titulo
            content 
            contenido
            otherContent
            otroContenido
          }
          ...on ComponentComponentProjectsSection {
            title
            titulo
            readMore
            leerMas
          }
          ...on ComponentLayoutOptions {
            title
            titulo
            option {
              title
              titulo
            }
          }
          }
        }
      }
    }
  }
`

const GET_BLOG_INFO = gql`
  query {
    blogs(pagination: { limit: -1 }) {
      data {
        attributes {
          Title
          Titulo
          Date
          Fecha
          Author
          Autor
          Image {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          Resume
          Resumen
          Content
          Contenido
          LinkBlog
          ExtraImg {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          ExtraContent
          ContenidoExtra
          etiqueta
          label
          Icon {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
        }
      }
    }
  }
`

const GET_PROJECTS_INFO = gql`
  query {
    projects(pagination: { limit: -1 }) {
      data {
        attributes {
          title
          titulo
          date
          fecha
          coordinates
          images {
            data {
              attributes {
                url
              }
            }
          }
          direction
          direccion
          size
          scope
          alcance
          credits
          creditos
          content
          contenido
          type
          secondType
          presentation
        }
      }
    }
  }
`

const GET_SEARCH_BLOG_INFO = gql`
  query {
    searchBlog {
      data {
        attributes {
          title
          titulo
          orderBy {
            field
          }
          ordenadoPor {
            field
          }
          labelsTitle
          tituloEtiquetas
          labels {
            field
          }
          etiquetas {
            field
          }
          icon {
            data {
              attributes {
                url
                alternativeText
              }
            }
          }
          button
          boton
        }
      }
    }
  }
`

export {
  GET_HEADER_INFO,
  GET_FOOTER_INFO,
  GET_PAGE_INFO,
  GET_PAGES_INFO,
  generatePage,
  GET_BLOG_INFO,
  GET_PROJECTS_INFO,
  GET_SEARCH_BLOG_INFO,
}
