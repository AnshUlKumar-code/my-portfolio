import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'Products', href: '#products' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ]

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#home" className={styles.logo}>
          <span className={styles.bracket}>{'<'}</span>
          Anurag
          <span className={styles.accent}>.dev</span>
          <span className={styles.bracket}>{'/>'}</span>
        </a>

        <div className={styles.desktopLinks}>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={styles.link}>
              {link.name}
            </a>
          ))}
        </div>

        <div className={styles.desktopSocial}>
          <a href="https://github.com/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FiLinkedin />
          </a>
          <a href="https://twitter.com/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="Twitter">
            <FiTwitter />
          </a>
        </div>

        <button 
          className={styles.menuToggle} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className={styles.mobileLink}
            onClick={handleLinkClick}
          >
            {link.name}
          </a>
        ))}
        <div className={styles.mobileSocial}>
          <a href="https://github.com/anuragsrivastava" target="_blank" rel="noreferrer">
            <FiGithub />
          </a>
          <a href="https://linkedin.com/in/anuragsrivastava" target="_blank" rel="noreferrer">
            <FiLinkedin />
          </a>
          <a href="https://twitter.com/anuragsrivastava" target="_blank" rel="noreferrer">
            <FiTwitter />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar