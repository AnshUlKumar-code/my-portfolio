// components/Contact.jsx
import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { contactAPI } from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const res = await contactAPI.submit(formData)
    
    if (res.success) {
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 3000)
    }
    
    setLoading(false)
  }

  return (
    <section id="contact" className="py-20 px-4 bg-primary-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400">Have a project in mind? Let's talk!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <FiMail size={20} />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <p className="text-gray-400">anshulkumar73610@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <FiPhone size={20} />
              </div>
              <div>
                <h4 className="font-medium">Phone</h4>
                <p className="text-gray-400">+91 9262 577 584</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                <FiMapPin size={20} />
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-gray-400">Bihar, India</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
                Message sent successfully!
              </div>
            )}
            
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                required
              />
            </div>
            
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="input-field"
              required
            />
            
            <textarea
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="input-field resize-none"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending...' : <><FiSend /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact