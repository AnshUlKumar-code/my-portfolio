// services/api.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_URL
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
})

// Auth APIs
export const authAPI = {
  login: async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password })
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  }
}

// Profile APIs
export const profileAPI = {
  get: async () => {
    try {
      const res = await api.get('/profile')
      return { success: true, data: res.data.profile }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  create: async (formData) => {
    try {
      const res = await api.post('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  update: async (formData) => {
    try {
      const res = await api.put('/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  delete: async () => {
    try {
      const res = await api.delete('/profile')
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  downloadResume: () => {
    window.open(`${API_URL}/profile/resume/download`, '_blank')
  }
}

// Projects APIs
export const projectsAPI = {
  getAll: async () => {
    try {
      const res = await api.get('/projects')
      return { success: true, data: res.data.projects }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  getOne: async (id) => {
    try {
      const res = await api.get(`/projects/${id}`)
      return { success: true, data: res.data.project }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  create: async (projectData) => {
    try {
      const res = await api.post('/projects', projectData)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  update: async (id, projectData) => {
    try {
      const res = await api.put(`/projects/${id}`, projectData)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/projects/${id}`)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  }
}

// Skills APIs
export const skillsAPI = {
  getAll: async () => {
    try {
      const res = await api.get('/skills')
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  create: async (skillData) => {
    try {
      const res = await api.post('/skills', skillData)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  update: async (id, skillData) => {
    try {
      const res = await api.put(`/skills/${id}`, skillData)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/skills/${id}`)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  }
}

// Contact API
export const contactAPI = {
  submit: async (formData) => {
    try {
      const res = await api.post('/contact', formData)
      return { success: true, data: res.data }
    } catch (error) {
      return { success: false, error: error.response?.data?.message || error.message }
    }
  }
}

export default api