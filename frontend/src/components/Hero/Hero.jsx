import { FiArrowRight, FiDownload, FiCode, FiLayout, FiSmartphone } from 'react-icons/fi'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.background}>
        <div className={`${styles.orb} ${styles.orb1}`}></div>
        <div className={`${styles.orb} ${styles.orb2}`}></div>
        <div className={styles.grid}></div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <div className={styles.badge} data-aos="fade-down">
            <FiCode />
            <span>Full Stack Developer</span>
          </div>

          <h1 className={styles.title} data-aos="fade-up" data-aos-delay="100">
            <span className={styles.line}>Code Crafter</span>
            <span className={styles.line}>Building Digital</span>
            <span className={styles.gradient}>Excellence</span>
          </h1>

          <p className={styles.subtitle} data-aos="fade-up" data-aos-delay="200">
            Enhance your Digital Experience with Innovative Solutions,
            Transforming the Landscape of App and Web Development
          </p>

          <div className={styles.stats} data-aos="fade-up" data-aos-delay="300">
            <div className={styles.stat}>
              <span className={styles.number}>50+</span>
              <span className={styles.label}>Projects Delivered</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.stat}>
              <span className={styles.number}>30+</span>
              <span className={styles.label}>Happy Clients</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.stat}>
              <span className={styles.number}>5+</span>
              <span className={styles.label}>Years Experience</span>
            </div>
          </div>

          <div className={styles.buttons} data-aos="fade-up" data-aos-delay="400">
            <a href="#contact" className={styles.btnPrimary}>
              Get Started
              <FiArrowRight />
            </a>
            <a href="/resume.pdf" className={styles.btnSecondary} download>
              <FiDownload />
              Download CV
            </a>
          </div>

          <div className={styles.services} data-aos="fade-up" data-aos-delay="500">
            <div className={styles.tag}>
              <FiLayout />
              <span>Web Development</span>
            </div>
            <div className={styles.tag}>
              <FiSmartphone />
              <span>App Development</span>
            </div>
            <div className={styles.tag}>
              <FiCode />
              <span>UI/UX Design</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero