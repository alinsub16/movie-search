import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Hero from './sections/Hero'
import TrailerPlayer from './components/TrailerPlayer'

function App() {


  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/trailer/:videoKey" element={<TrailerPlayer />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
