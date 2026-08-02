import { useState } from 'react'
import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage.jsx';
import Game from './pages/Game.jsx';

function App() {

  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<Game />} />
        {/* <Route path="/login" element={<Login/>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
