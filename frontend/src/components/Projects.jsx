// components/Products.jsx
import { useState, useEffect } from 'react'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projectsAPI } from '../services/api'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await projectsAPI.getAll()
      if (res.success) {
        const featured = res.data.filter(p => p.featured)
        setProjects(featured)
      }
      setLoading(false)
    }
    fetchProjects()
  }, [])

  if (loading) return <div className="py-20 text-center">Loading...</div>

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400">Some of my best work</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-primary-card border border-primary-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all cursor-pointer"
              onClick={() => window.open(project.liveLink, '_blank')}
            >
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center">
                {project.Image ? (
                  <img src={project.Image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">🚀</span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-primary-bg border border-primary-border rounded-lg text-sm hover:border-accent hover:text-accent transition-all"
                  >
                    <FiGithub /> Code
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accent-secondary rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-accent/30 transition-all"
                  >
                    <FiExternalLink /> Live
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects