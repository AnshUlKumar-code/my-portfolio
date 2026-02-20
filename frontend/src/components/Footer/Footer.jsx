import { FiHeart, FiArrowUp } from 'react-icons/fi'
import styles from './Footer.module.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.bracket}>{'<'}</span>
            Anurag
            <span className={styles.accent}>.dev</span>
            <span className={styles.bracket}>{'/>'}</span>
          </div>
          
          <p className={styles.tagline}>
            Crafting digital experiences with passion and precision.
          </p>
          
          <div className={styles.links}>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#products">Products</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Anurag Srivastava. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <FiHeart className={styles.heart} /> in India
          </p>
        </div>
        
        <button className={styles.scrollTop} onClick={scrollToTop} aria-label="Scroll to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  )
}

export default Footer