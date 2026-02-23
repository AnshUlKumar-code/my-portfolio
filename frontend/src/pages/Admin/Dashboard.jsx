// pages/Admin/Dashboard.jsx
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiUser, FiCode, FiLayers, FiMessageSquare, FiLogOut, FiArrowRight } from 'react-icons/fi'

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const cards = [
    { title: 'Profile', icon: <FiUser size={24} />, desc: 'Manage your info', link: '/admin/profile', color: 'from-blue-500 to-blue-600' },
    { title: 'Skills', icon: <FiCode size={24} />, desc: 'Update tech stack', link: '/admin/skills', color: 'from-green-500 to-green-600' },
    { title: 'Projects', icon: <FiLayers size={24} />, desc: 'Manage projects', link: '/admin/projects', color: 'from-purple-500 to-purple-600' },
   
  ]

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-primary-card border-b border-primary-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
              View Site <FiArrowRight />
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.link)}
              className="bg-primary-card border border-primary-border rounded-2xl p-6 hover:border-accent/50 cursor-pointer transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-bold mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Dashboard