// components/TechStack.jsx
import { useState, useEffect } from 'react'
import * as Si from 'react-icons/si'
import { skillsAPI } from '../services/api'

const TechStack = () => {
  const [skills, setSkills] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      const res = await skillsAPI.getAll()
      if (res.success) {
        setSkills(res.data)
      }
      setLoading(false)
    }
    fetchSkills()
  }, [])

  const categories = ['all', 'frontend', 'backend', 'database', 'devops']

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory)

  const getIcon = (iconName) => {
    const Icon = Si[iconName]
    return Icon ? <Icon size={40} /> : <span className="text-2xl">⚡</span>
  }

  if (loading) return <div className="py-20 text-center">Loading...</div>

  return (
    <section id="tech" className="py-20 px-4 bg-primary-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="text-gray-400">Technologies I work with</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full capitalize transition-all ${
                activeCategory === cat
                  ? 'bg-accent text-white'
                  : 'bg-primary-card border border-primary-border text-gray-400 hover:border-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-primary-card border border-primary-border rounded-xl hover:border-accent/50 hover:-translate-y-1 transition-all group"
            >
              <div 
                className="text-4xl group-hover:scale-110 transition-transform"
                style={{ color: skill.color }}
              >
                {getIcon(skill.icon)}
              </div>
              <span className="text-sm text-gray-300 text-center">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack