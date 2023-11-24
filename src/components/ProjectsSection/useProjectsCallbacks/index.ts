import { useCallback } from 'react'
import { type ProjectsAttributes, type ProjectInfo } from '@/types'

type SetProjectsInfo = (projectsInfo: ProjectInfo[]) => void

export const useProjectsCallbacks = (setProjectsInfo: SetProjectsInfo) => {
  const reverseProjects = useCallback((projectInfo: ProjectsAttributes[]) => {
    const ourProjects: ProjectInfo[] = []
    projectInfo.forEach((project) => {
      const {
        title,
        titulo,
        content,
        contenido,
        images,
        date,
        fecha,
        coordinates,
        direction,
        direccion,
        size,
        scope,
        alcance,
      } = project.attributes
      const projectPart = {
        title,
        titulo,
        content,
        contenido,
        images,
        date,
        fecha,
        coordinates,
        direction,
        direccion,
        size,
        scope,
        alcance,
      }
      ourProjects.push(projectPart)
    })
    setProjectsInfo(ourProjects)
  }, [])

  const reverseLastThree = useCallback(
    (projectInfo: ProjectsAttributes[]) => {
      if (projectInfo.length <= 3) {
        const projects = projectInfo.reverse()
        reverseProjects(projects)
      } else {
        const lastThreeProjects = projectInfo.slice(-3).reverse()
        reverseProjects(lastThreeProjects)
      }
    },
    [reverseProjects]
  )
  return { reverseLastThree }
}
