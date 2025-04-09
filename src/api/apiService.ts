import axios from 'axios'
import API_BASE_URL from './apiConfig'
import authService from './authService'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// Add Bearer Token Automatically
api.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const apiService = {
  getAll: async (endpoint: string) => {
    try {
      const response = await api.get(`${API_BASE_URL}/${endpoint}`)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching ${endpoint}: ${error}`)
    }
  },
  getById: async (endpoint: string, id: string) => {
    try {
      const response = await api.get(`${API_BASE_URL}/${endpoint}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Error fetching ${endpoint} by ID: ${error}`)
    }
  },
  create: async (endpoint: string, data: object) => {
    try {
      const response = await api.post(`${API_BASE_URL}/${endpoint}`, data)
      return response.data
    } catch (error) {
      throw new Error(`Error creating ${endpoint}: ${error}`)
    }
  },
  update: async (endpoint: string, id: string, data: object) => {
    try {
      const response = await api.put(`${API_BASE_URL}/${endpoint}/${id}`, data)
      return response.data
    } catch (error) {
      throw new Error(`Error updating ${endpoint}: ${error}`)
    }
  },
  delete: async (endpoint: string, id: string) => {
    try {
      const response = await api.delete(`${API_BASE_URL}/${endpoint}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Error deleteing ${endpoint}: ${error}`)
    }
  },
}
export default apiService
