import React from 'react'
import Header from 'c/Header'
import Footer from 'c/Footer'
import AppRouter from '@/router/Router'

import './App.scss'

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  )
}

export default App
