// pages/Admin/ProfileEdit.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { profileAPI } from '../../services/api'
import { FiArrowLeft, FiUpload, FiGithub, FiLinkedin } from 'react-icons/fi'

const ProfileEdit = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    social: { github: '', linkedin: '', instagram: '' }
  })
  const [photo, setPhoto] = useState(null)
  const [resume, setResume] = useState(null)
  const [photoPreview, setPhotoPreview] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await profileAPI.get()
      if (res.success) {
        setFormData({
          name: res.data.name || '',
          title: res.data.title || '',
          bio: res.data.bio || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          location: res.data.location || '',
          social: res.data.social || { github: '', linkedin: '', instagram: '' }
        })
        setPhotoPreview(res.data.photo || '')
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const data = new FormData()
    Object.keys(formData).forEach(key => {
      if (key === 'social') {
        data.append(key, JSON.stringify(formData[key]))
      } else {
        data.append(key, formData[key])
      }
    })
    if (photo) data.append('photo', photo)
    if (resume) data.append('resume', resume)

    const res = await profileAPI.update(data)
    
    if (res.success) {
      setMessage('Profile updated successfully!')
    } else {
      setMessage('Error: ' + res.error)
    }
    
    setLoading(false)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-primary-card border-b border-primary-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-white">
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="bg-primary-card border border-primary-border rounded-2xl p-6">
            <h3 className="font-medium mb-4">Profile Photo</h3>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-primary-bg border-2 border-primary-border">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                )}
              </div>
              <label className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg cursor-pointer hover:bg-accent/20 transition-all">
                <FiUpload /> Change Photo
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-primary-card border border-primary-border rounded-2xl p-6 space-y-4">
            <h3 className="font-medium mb-4">Basic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Title (e.g. Full Stack Developer)"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="input-field"
                required
              />
            </div>

            <textarea
              placeholder="Bio"
              rows="3"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              className="input-field resize-none"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="input-field"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="input-field"
              required
            />
          </div>

          {/* Social Links */}
          <div className="bg-primary-card border border-primary-border rounded-2xl p-6 space-y-4">
            <h3 className="font-medium mb-4">Social Links</h3>
            
            <div className="relative">
              <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="GitHub URL"
                value={formData.social.github}
                onChange={(e) => setFormData({...formData, social: {...formData.social, github: e.target.value}})}
                className="input-field pl-10"
              />
            </div>

            <div className="relative">
              <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={formData.social.linkedin}
                onChange={(e) => setFormData({...formData, social: {...formData.social, linkedin: e.target.value}})}
                className="input-field pl-10"
              />
            </div>

            <input
              type="url"
              placeholder="Instagram URL"
              value={formData.social.instagram}
              onChange={(e) => setFormData({...formData, social: {...formData.social, instagram: e.target.value}})}
              className="input-field"
            />
          </div>

          {/* Resume Upload */}
          <div className="bg-primary-card border border-primary-border rounded-2xl p-6">
            <h3 className="font-medium mb-4">Resume</h3>
            <label className="flex items-center gap-2 px-4 py-3 bg-accent/10 text-accent rounded-lg cursor-pointer hover:bg-accent/20 transition-all border border-dashed border-accent/30">
              <FiUpload /> {resume ? resume.name : 'Upload Resume (PDF)'}
              <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="hidden" />
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ProfileEdit