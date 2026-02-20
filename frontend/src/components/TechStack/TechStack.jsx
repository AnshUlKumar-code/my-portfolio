import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, 
  SiJavascript, SiTypescript, SiTailwindcss, SiGit,
  SiDocker, SiFirebase, SiFigma, SiPython,
  SiPostgresql, SiRedis, SiGraphql
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import styles from './TechStack.module.css'

const TechStack = () => {
  const categories = [
    {
      title: 'Frontend',
      icon: '🎨',
      technologies: [
        { name: 'React', icon: <SiReact />, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#ffffff' },
        { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' }
      ]
    },
    {
      title: 'Backend',
      icon: '⚙️',
      technologies: [
        { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933' },
        { name: 'Python', icon: <SiPython />, color: '#3776AB' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#336791' },
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: '🛠️',
      technologies: [
        { name: 'Git', icon: <SiGit />, color: '#F05032' },
        { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Redis', icon: <SiRedis />, color: '#DC382D' },
        { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' }
      ]
    }
  ]

  return (
    <section id="tech" className={styles.techStack}>
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Our Toolbox</h2>
        <p className="section-subtitle" data-aos="fade-up">
          Cutting-edge technologies for your product excellence
        </p>

        <div className={styles.categories}>
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={styles.category}
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className={styles.header}>
                <span className={styles.icon}>{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className={styles.grid}>
                {category.technologies.map((tech, idx) => (
                  <div 
                    key={idx} 
                    className={styles.item} 
                    style={{ '--tech-color': tech.color }}
                  >
                    <div className={styles.techIcon}>{tech.icon}</div>
                    <span className={styles.name}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack