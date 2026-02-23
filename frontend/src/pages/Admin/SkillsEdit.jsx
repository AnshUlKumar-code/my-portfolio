// pages/Admin/SkillsEdit.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { skillsAPI } from '../../services/api'
import { FiArrowLeft, FiPlus, FiTrash2, FiEdit2, FiSave, FiX } from 'react-icons/fi'
import * as Si from 'react-icons/si'

const SkillsEdit = () => {
  const navigate = useNavigate()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(null)
  const [showAdd, setShowAdd] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    color: '#6366f1',
    category: 'frontend',
    proficiency: 8
  })

  const categories = ['frontend', 'backend', 'database', 'devops', 'tools']

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    const res = await skillsAPI.getAll()
    if (res.success) {
      setSkills(res.data)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = editing 
      ? await skillsAPI.update(editing, formData)
      : await skillsAPI.create(formData)

    if (res.success) {
      fetchSkills()
      setShowAdd(false)
      setEditing(null)
      resetForm()
    }
    
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return
    const res = await skillsAPI.delete(id)
    if (res.success) fetchSkills()
  }

  const startEdit = (skill) => {
    setEditing(skill._id)
    setFormData({
      name: skill.name,
      icon: skill.icon,
      color: skill.color,
      category: skill.category,
      proficiency: skill.proficiency
    })
    setShowAdd(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      color: '#6366f1',
      category: 'frontend',
      proficiency: 8
    })
  }

  const getIcon = (iconName) => {
    const Icon = Si[iconName]
    return Icon ? <Icon size={24} /> : <span>⚡</span>
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
            <h1 className="text-xl font-bold">Manage Skills</h1>
          </div>
          <button
            onClick={() => {
              setShowAdd(!showAdd)
              setEditing(null)
              resetForm()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all"
          >
            {showAdd ? <FiX /> : <FiPlus />} {showAdd ? 'Cancel' : 'Add Skill'}
          </button>
        </div>
      </header>

      {/* Add/Edit Form */}
      {showAdd && (
        <div className="max-w-4xl mx-auto px-6 py-6">
          <form onSubmit={handleSubmit} className="bg-primary-card border border-primary-border rounded-2xl p-6 space-y-4">
            <h3 className="font-medium">{editing ? 'Edit Skill' : 'Add New Skill'}</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Skill Name (e.g. React)"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Icon Name (e.g. SiReact)"
                value={formData.icon}
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                className="input-field"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="input-field"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="input-field h-12"
              />
              <input
                type="number"
                min="1"
                max="10"
                value={formData.proficiency}
                onChange={(e) => setFormData({...formData, proficiency: parseInt(e.target.value)})}
                className="input-field"
                placeholder="Proficiency (1-10)"
              />
            </div>

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

      {/* Skills List */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-primary-card border border-primary-border rounded-xl p-4 flex items-center justify-between hover:border-accent/30 transition-all">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-bg"
                  style={{ color: skill.color }}
                >
                  {getIcon(skill.icon)}
                </div>
                <div>
                  <h4 className="font-medium">{skill.name}</h4>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="capitalize">{skill.category}</span>
                    <span>•</span>
                    <span>Level: {skill.proficiency}/10</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(skill)}
                  className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-all"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDelete(skill._id)}
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

export default SkillsEdit