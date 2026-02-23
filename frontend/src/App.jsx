// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Home from './pages/Home'
 import Login from './pages/Admin/Login'
import Dashboard from './pages/Admin/Dashboard'
import ProfileEdit from './pages/Admin/ProfileEdit'
import SkillsEdit from './pages/Admin/SkillsEdit'
import ProjectsEdit from './pages/Admin/ProjectsEdit'

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/admin/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
         <Route path="/admin/login" element={<Login />} />

        
        {/* //Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute>
            <ProfileEdit />
          </ProtectedRoute>
        } />
        <Route path="/admin/skills" element={
          <ProtectedRoute>
            <SkillsEdit />
          </ProtectedRoute>
        } />
        <Route path="/admin/projects" element={
          <ProtectedRoute>
            <ProjectsEdit />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App