// components/Hero.jsx
import { useState, useEffect } from 'react'
import { FiDownload, FiArrowRight, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { profileAPI } from '../services/api'

const Hero = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await profileAPI.get()
      if (res.success) {
        setProfile(res.data)
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

const downloadResume = () => {
  if (!profile?.resume?.url) return;
  window.open(profile.resume.url, "_blank");
};
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  console.log(profile);
  

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Photo */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent/50 shadow-2xl shadow-accent/20">
                {profile?.photo ? (
                  <img 
                    src={profile.photo} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-6xl">
                    👨‍💻
                  </div>
                )}
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                {profile?.social?.github && (
                  <a href={profile.social.github} target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary-card border border-primary-border rounded-full flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all">
                    <FiGithub size={18} />
                  </a>
                )}
                {profile?.social?.linkedin && (
                  <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary-card border border-primary-border rounded-full flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all">
                    <FiLinkedin size={18} />
                  </a>
                )}
                {profile?.social?.instagram && (
                  <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 bg-primary-card border border-primary-border rounded-full flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent transition-all">
                    <FiTwitter size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 md:order-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              {profile?.title || 'Full Stack Developer'}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                {profile?.name?.split(' ')[0] || 'Anurag'}
              </span>
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-6">
              Building Digital Excellence
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto md:mx-0">
              {profile?.bio || 'I create scalable web applications with modern technologies. Passionate about clean code and user experience.'}
            </p>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">50+</div>
                <div className="text-gray-400 text-sm">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">5+</div>
                <div className="text-gray-400 text-sm">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">30+</div>
                <div className="text-gray-400 text-sm">Clients</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={downloadResume}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <FiDownload /> Download Resume
              </button>
              <a href="#contact" className="btn-secondary flex items-center justify-center gap-2">
                Contact Me <FiArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero