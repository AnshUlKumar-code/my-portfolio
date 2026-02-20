import { useState } from 'react'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { BsQuote } from 'react-icons/bs'
import styles from './Testimonials.module.css'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder, EduTech Startup',
      image: 'P',
      content: 'Anurag delivered our LMS platform ahead of schedule. The attention to detail and code quality exceeded our expectations. Highly recommended!',
      rating: 5,
      project: 'Learnzy LMS'
    },
    {
      name: 'Rahul Verma',
      role: 'CEO, TaskMaster Inc',
      image: 'R',
      content: 'Working with Anurag was a game-changer for our productivity app. He understood our vision perfectly and added features we didnt even know we needed.',
      rating: 5,
      project: 'Task Earner App'
    },
    {
      name: 'Sneha Patel',
      role: 'Product Manager, TechCorp',
      image: 'S',
      content: 'Exceptional full-stack skills! Anurag built our entire e-commerce platform from scratch. The performance optimization he did was incredible.',
      rating: 5,
      project: 'E-Commerce Platform'
    },
    {
      name: 'Amit Kumar',
      role: 'CTO, StartupHub',
      image: 'A',
      content: 'Not just a developer, but a true problem solver. Anurag suggested architectural improvements that saved us thousands in infrastructure costs.',
      rating: 5,
      project: 'Cloud Migration'
    }
  ]

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Previous Works!</h2>
        <p className="section-subtitle" data-aos="fade-up">
          It's not just us. Here's what others have to say about working with Anurag.
        </p>

        <div className={styles.wrapper} data-aos="fade-up">
          <div className={styles.card}>
            <div className={styles.quote}>
              <BsQuote />
            </div>
            
            <div className={styles.content}>
              <p className={styles.text}>{testimonials[currentIndex].content}</p>
              
              <div className={styles.rating}>
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FiStar key={i} className={styles.star} />
                ))}
              </div>

              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: `hsl(${currentIndex * 60}, 70%, 50%)` }}>
                  {testimonials[currentIndex].image}
                </div>
                <div className={styles.info}>
                  <h4>{testimonials[currentIndex].name}</h4>
                  <span>{testimonials[currentIndex].role}</span>
                  <span className={styles.project}>{testimonials[currentIndex].project}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button onClick={prev} className={styles.btn} aria-label="Previous">
              <FiChevronLeft />
            </button>
            <div className={styles.dots}>
              {testimonials.map((_, index) => (
                <span 
                  key={index} 
                  className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button onClick={next} className={styles.btn} aria-label="Next">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials