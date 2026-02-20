import { FiCode, FiSmartphone, FiGlobe, FiDatabase, FiCloud, FiShield } from 'react-icons/fi'
import styles from './Services.module.css'

const Services = () => {
  const services = [
    {
      icon: <FiGlobe />,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
      features: ['Responsive Design', 'SEO Optimized', 'High Performance']
    },
    {
      icon: <FiSmartphone />,
      title: 'App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.',
      features: ['iOS & Android', 'Offline Support', 'Push Notifications']
    },
    {
      icon: <FiCode />,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that provide exceptional user experiences and drive engagement.',
      features: ['User Research', 'Prototyping', 'Design Systems']
    },
    {
      icon: <FiDatabase />,
      title: 'Backend Development',
      description: 'Robust APIs and server-side solutions with Node.js, Python, and cloud infrastructure.',
      features: ['REST & GraphQL', 'Database Design', 'Microservices']
    },
    {
      icon: <FiCloud />,
      title: 'Cloud Solutions',
      description: 'Scalable cloud architecture and deployment on AWS, Google Cloud, and Azure platforms.',
      features: ['Auto Scaling', 'CI/CD Pipelines', 'Monitoring']
    },
    {
      icon: <FiShield />,
      title: 'Security Audit',
      description: 'Comprehensive security assessments and implementation of best practices for your applications.',
      features: ['Vulnerability Scan', 'Code Review', 'Compliance']
    }
  ]

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Services We Provide</h2>
        <p className="section-subtitle" data-aos="fade-up">
          Comprehensive digital solutions tailored to your business needs
        </p>

        <div className={styles.grid}>
          {services.map((service, index) => (
            <div 
              key={index} 
              className={styles.card}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.icon}>
                {service.icon}
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
              <ul className={styles.features}>
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services