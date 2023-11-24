import React, { useState, useEffect } from 'react'
import { useFunctions } from '@/hooks'
import { type Children } from '@/types'
import { type FormatArray } from '../..'
import { useProjectsFunctions } from '../Projectsfunctions'
import Pagination from 'c/Pagination'

interface ToShow {
  showProjects: FormatArray
}

const Showprojects = ({ showProjects }: ToShow) => {
  const [projectss, setProjectss] = useState<Children[]>([])
  const [childrenPart, setChildrenPart] = useState(0)
  const { setOurProjects } = useProjectsFunctions()
  const { arrsSegments } = useFunctions()

  let moreProjects: Children[][]

  useEffect(() => {
    setOurProjects(showProjects, setProjectss)
  }, [setOurProjects, showProjects])

  if (projectss.length > 5) {
    moreProjects = arrsSegments(projectss)
  }
  return (
    <>
      {projectss.length <= 5 ? projectss : moreProjects[childrenPart]}
      {projectss.length > 5 && (
        <Pagination
          arrLength={moreProjects.length}
          itemsPerPage={4}
          setChosen={setChildrenPart}
        />
      )}
    </>
  )
}

export default Showprojects
