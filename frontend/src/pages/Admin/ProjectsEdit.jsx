// pages/Admin/ProjectsEdit.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projectsAPI } from '../../services/api'
import { FiArrowLeft, FiPlus, FiTrash2, FiEdit2, FiSave, FiX, FiCheck } from 'react-icons/fi'

const ProjectsEdit = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'Web App',
    platform: 'web',
    technologies: '',
    githubLink: '',
    liveLink: '',
    featured: false
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const res = await projectsAPI.getAll()
    if (res.success) {
      setProjects(res.data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
    }

    const res = editing
      ? await projectsAPI.update(editing, data)
      : await projectsAPI.create(data)

    if (res.success) {
      fetchProjects()
      setShowAdd(false)
      setEditing(null)
      resetForm()
    }
    
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    const res = await projectsAPI.delete(id)
    if (res.success) fetchProjects()
  }

  const startEdit = (project) => {
    setEditing(project._id)
    setFormData({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription,
      category: project.category,
      platform: project.platform,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      featured: project.featured
    })
    setShowAdd(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      category: 'Web App',
      platform: 'web',
      technologies: '',
      githubLink: '',
      liveLink: '',
      featured: false
    })
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-primary-card border-b border-primary-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-white">
              <FiArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Manage Projects</h1>
          </div>
          <button
            onClick={() => {
              setShowAdd(!showAdd)
              setEditing(null)
              resetForm()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
          >
            {showAdd ? <FiX /> : <FiPlus />} {showAdd ? 'Cancel' : 'Add Project'}
          </button>
        </div>
      </header>

      {/* Add/Edit Form */}
      {showAdd && (
        <div className="max-w-4xl mx-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="bg-primary-card border border-primary-border rounded-2xl p-6 space-y-4">
            <h3 className="font-medium">{editing ? 'Edit Project' : 'Add New Project'}</h3>
            
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="input-field"
              required
            />

            <input
              type="text"
              placeholder="Short Description (for cards)"
              value={formData.shortDescription}
              onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
              className="input-field"
              required
            />

            <textarea
              placeholder="Full Description"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input-field resize-none"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="input-field"
              >
                <option>Web App</option>
                <option>Mobile App</option>
                <option>Full Stack</option>
                <option>UI/UX Design</option>
              </select>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({...formData, platform: e.target.value})}
                className="input-field"
              >
                <option value="web">Web</option>
                <option value="android">Android</option>
                <option value="ios">iOS</option>
              </select>
            </div>

            <input
              type="text"
              placeholder="Technologies (comma separated: React, Node, MongoDB)"
              value={formData.technologies}
              onChange={(e) => setFormData({...formData, technologies: e.target.value})}
              className="input-field"
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="GitHub Link"
                value={formData.githubLink}
                onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                className="input-field"
              />
              <input
                type="url"
                placeholder="Live Link"
                value={formData.liveLink}
                onChange={(e) => setFormData({...formData, liveLink: e.target.value})}
                className="input-field"
                required
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <div 
                onClick={() => setFormData({...formData, featured: !formData.featured})}
                className={`w-12 h-6 rounded-full transition-all ${formData.featured ? 'bg-accent' : 'bg-primary-border'} relative`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.featured ? 'left-7' : 'left-1'}`} />
              </div>
              <span className="text-sm">Featured on homepage</span>
            </label>

            <div className="flex gap-4">
              <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
                <FiSave /> {loading ? 'Saving...' : (editing ? 'Update' : 'Add')}
              </button>
              <button type="button" onClick={() => {setShowAdd(false); resetForm()}} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project._id} className={`bg-primary-card border rounded-xl p-4 flex items-center justify-between hover:border-accent/30 transition-all ${project.featured ? 'border-accent/50' : 'border-primary-border'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center text-xl">
                  🚀
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{project.title}</h4>
                    {project.featured && <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full">Featured</span>}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-1">{project.shortDescription}</p>
                  <div className="flex gap-2 mt-1">
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs text-gray-500">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ProjectsEdit