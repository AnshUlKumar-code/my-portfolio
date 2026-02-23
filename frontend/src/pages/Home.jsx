// pages/Home.jsx
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import TechStack from '../components/TechStack'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Projects from '../components/Projects'

const Home = () => {
  return (
    <div className="min-h-screen bg-primary-bg">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home