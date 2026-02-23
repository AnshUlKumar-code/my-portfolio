// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Create axios instance for auth
const authApi = axios.create({
  baseURL: API_URL
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ token })
    }
    setLoading(false)
  }, [])

  // Add interceptor to all axios requests
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.token = token
      }
      return config
    })

    return () => axios.interceptors.request.eject(interceptor)
  }, [])

  const login = async (email, password) => {
    try {
      const res = await authApi.post('/auth/login', { email, password })
      const { token } = res.data
      
      if (!token) {
        return { success: false, error: 'No token received' }
      }

      localStorage.setItem('token', token)
      setUser({ token, email })
      
      return { success: true, data: res.data }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || error.message || 'Login failed'
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)