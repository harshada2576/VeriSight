import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Pricing from './pages/Pricing'
import Demo from './pages/Demo'
import Header from './components/Header'
import Footer from './components/Footer'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

export default function App(){
  const [route, setRoute] = useState('home')
  const Nav = { home: <Home go={setRoute}/>, how: <HowItWorks/>, pricing: <Pricing/>, demo: <Demo/> }
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-deep-trust text-white antialiased">
        <Header onNavigate={setRoute} />
        <main className="max-w-6xl mx-auto p-6">
          {Nav[route]}
        </main>
        <Footer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
