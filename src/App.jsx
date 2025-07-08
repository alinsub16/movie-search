import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Hero from './sections/Hero'
import TrailerPlayer from './components/TrailerPlayer'

function App() {


  return (
    <>
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/trailer/:videoKey" element={<TrailerPlayer />} />
      </Routes>
    </HashRouter>
    </>
  )
}

export default App
