import { FiExternalLink, FiGithub, FiSmartphone, FiMonitor, FiStar } from 'react-icons/fi'
import styles from './Products.module.css'

const Products = () => {
  const products = [
    {
      title: 'Learnzy LMS',
      category: 'Education',
      platform: 'web',
      description: 'Complete Learning Management System with website, mobile app & admin panel for modern educators.',
      tech: ['React', 'Node.js', 'MongoDB'],
      demoLink: '#',
      githubLink: '#',
      featured: true,
      rating: 4.9
    },
    {
      title: 'Task Earner',
      category: 'Productivity',
      platform: 'android',
      description: 'Task management app with integrated ad networks and web-based admin panel.',
      tech: ['React Native', 'Firebase'],
      demoLink: '#',
      githubLink: '#',
      rating: 4.8
    },
    {
      title: 'E-Courses Pro',
      category: 'Education',
      platform: 'android',
      description: 'Professional course selling platform with live videos, mock tests & admin dashboard.',
      tech: ['Flutter', 'Node.js'],
      demoLink: '#',
      githubLink: '#',
      rating: 4.7
    },
    {
      title: 'Lunatics Editor',
      category: 'Photography',
      platform: 'android',
      description: 'Advanced image editing app with filters, crop, adjust tools & integrated ads.',
      tech: ['React Native', 'TensorFlow'],
      demoLink: '#',
      githubLink: '#',
      rating: 4.6
    },
    {
      title: 'Live Wallpapers',
      category: 'Personalization',
      platform: 'android',
      description: 'Dynamic wallpaper app with Airtable integration and video wallpaper support.',
      tech: ['Kotlin', 'Airtable API'],
      demoLink: '#',
      githubLink: '#',
      rating: 4.5
    },
    {
      title: 'InspireDaily',
      category: 'Lifestyle',
      platform: 'android',
      description: 'Daily quotes reader with personalization features and admin panel.',
      tech: ['React Native', 'Node.js'],
      demoLink: '#',
      githubLink: '#',
      rating: 4.8
    }
  ]

  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Ready-to-Use Solutions</h2>
        <p className="section-subtitle" data-aos="fade-up">
          Customized products built with precision and care
        </p>

        <div className={styles.grid}>
          {products.map((product, index) => (
            <div 
              key={index} 
              className={`${styles.card} ${product.featured ? styles.featured : ''}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {product.featured && <span className={styles.badge}>Featured</span>}
              
              <div className={styles.image}>
                <div className={styles.placeholder}>
                  {product.platform === 'web' ? <FiMonitor /> : <FiSmartphone />}
                </div>
                <span className={styles.platform}>{product.platform}</span>
                <div className={styles.rating}>
                  <FiStar className={styles.star} />
                  <span>{product.rating}</span>
                </div>
              </div>

              <div className={styles.content}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>
                
                <div className={styles.tech}>
                  {product.tech.map((t, i) => (
                    <span key={i} className={styles.tag}>{t}</span>
                  ))}
                </div>

                <div className={styles.links}>
                  <a href={product.demoLink} className={styles.primary}>
                    <FiExternalLink />
                    Live Demo
                  </a>
                  <a href={product.githubLink} className={styles.secondary}>
                    <FiGithub />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.seeMore} data-aos="fade-up">
          <a href="#contact" className={styles.btn}>View All Projects</a>
        </div>
      </div>
    </section>
  )
}

export default Products