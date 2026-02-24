// components/Navbar.jsx
import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { profileAPI } from '../services/api'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [social, setSocial] = useState({})

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    const fetchSocial = async () => {
      const res = await profileAPI.get()
      if (res.success) {
        setSocial(res.data.social || {})
      }
    }
    fetchSocial()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary-bg/95 backdrop-blur-md border-b border-primary-border py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-1 text-2xl font-bold">
            <span className="text-accent">&lt;</span>
            <span>Anshul</span>
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">.dev</span>
            <span className="text-accent">/&gt;</span>
          </a>

          {/* Desktop Nav */}
          
<div className="hidden md:flex items-center gap-8">
  {navLinks.map((link) => (
    <a 
      key={link.name} 
      href={link.href}
      className="text-gray-300 hover:text-white relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full"
    >
      {link.name}
    </a>
  ))}
  {/* Admin Link - visible now */}

  
  <a 
    href={"https://my-portfolio-git-main-anshulkumar-codes-projects.vercel.app/admin/login"} 
    className="text-xs text-gray-500 hover:text-accent transition-colors px-2 py-1 border border-transparent hover:border-primary-border rounded"
  >
    Admin
  </a>
</div>

          {/* Social Icons */}
          <div className="hidden md:flex items-center gap-4">
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <FiGithub size={20} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <FiLinkedin size={20} />
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                <FiTwitter size={20} />
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-primary-card border-b border-primary-border transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-gray-300 hover:text-white py-2"
              >
                {link.name}
              </a>
            ))}
            <a href={"https://my-portfolio-git-main-anshulkumar-codes-projects.vercel.app/admin/login"} className="block text-gray-500 text-sm py-2">
              Admin
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar