import { useCallback } from 'react'
import { type BlogInfo, type BlogAttributes } from '@/types'

type SetBlogInfo = (blogInfo: BlogAttributes[]) => void

export const useCallBacks = (setBlogInfo: SetBlogInfo) => {
  const reverseBlog = useCallback((blogInfo: BlogInfo[]) => {
    const ourBlog: BlogAttributes[] = []
    blogInfo.forEach((information: BlogInfo) => {
      const { Title, Titulo, Date, Fecha, Author, Autor, Image, LinkBlog } =
        information.attributes
      const { url, alternativeText } = Image.data.attributes
      const blogElement: BlogAttributes = {
        Title,
        Titulo,
        Date,
        Fecha,
        Author,
        Autor,
        LinkBlog,
        url,
        altImg: alternativeText,
      }
      ourBlog.push(blogElement)
    })
    setBlogInfo(ourBlog)
  }, [])
  const reverseLastThree = useCallback(
    (arr: BlogInfo[]) => {
      if (arr.length <= 3) {
        const blogInfo = arr.reverse()
        reverseBlog(blogInfo)
      } else {
        const lastThree = arr.slice(-3).reverse()
        reverseBlog(lastThree)
      }
    },
    [reverseBlog]
  )
  return { reverseLastThree }
}
