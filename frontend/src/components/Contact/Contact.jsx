import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi'
import styles from './Contact.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Contact Us</h2>
        <p className="section-subtitle" data-aos="fade-up">
          Let's discuss your next project and bring your ideas to life
        </p>

        <div className={styles.wrapper}>
          <div className={styles.info} data-aos="fade-right">
            <h3>Let's Talk</h3>
            <p>Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as possible.</p>
            
            <div className={styles.items}>
              <div className={styles.item}>
                <div className={styles.icon}>
                  <FiMail />
                </div>
                <div>
                  <span>Email</span>
                  <a href="mailto:anurag@example.com">anurag@example.com</a>
                </div>
              </div>
              
              <div className={styles.item}>
                <div className={styles.icon}>
                  <FiPhone />
                </div>
                <div>
                  <span>Phone</span>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>
              
              <div className={styles.item}>
                <div className={styles.icon}>
                  <FiMapPin />
                </div>
                <div>
                  <span>Location</span>
                  <p>Mumbai, India</p>
                </div>
              </div>
            </div>

            <div className={styles.social}>
              <a href="https://github.com/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FiGithub />
              </a>
              <a href="https://linkedin.com/in/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="https://twitter.com/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://instagram.com/anuragsrivastava" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FiInstagram />
              </a>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} data-aos="fade-left">
            <div className={styles.row}>
              <div className={styles.group}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.group}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className={styles.group}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className={styles.group}>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className={styles.submit} disabled={isSubmitting}>
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FiSend />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact