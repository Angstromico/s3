import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './NotFound'
import Blog from '@/components/Blog'
import { GET_PAGES_INFO, generatePage } from '@/queries'
import { useQuery } from '@apollo/client'
import { type Pages } from '@/queries'
import SingleBlog from '@/components/SingleBlog'

const AppRouter = () => {
  const { loading, error, data } = useQuery(GET_PAGES_INFO)

  if (loading) return
  if (error) return <p>Error</p>

  const renderRoutes = () => {
    const routes: React.ReactElement[] = []
    data.pags.data.forEach((page: Pages) => {
      generatePage(routes, page)
    })
    return routes
  }

  return (
    <Routes>
      {renderRoutes()}
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/404' />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/blog'>
        <Route path=':blogPage' element={<SingleBlog />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
