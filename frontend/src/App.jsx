import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import TechStack from './components/TechStack/TechStack'
import Products from './components/Products/Products'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic'
    })
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Products />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App