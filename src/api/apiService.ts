// api/apiService.ts
import axios from 'axios'
import API_BASE_URL from './apiConfig'
import authService from './authService'
import { ApiResponse } from '../interfaces/components/ApiResponse'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const apiService = {
  getAll: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    const response = await api.get(`${API_BASE_URL}/${endpoint}`)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  },

  getById: async <T>(endpoint: string, id: string): Promise<ApiResponse<T>> => {
    const response = await api.get(`${API_BASE_URL}/${endpoint}/${id}`)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  },

  create: async <T>(endpoint: string, data: T): Promise<ApiResponse<T>> => {
    const response = await api.post(`${API_BASE_URL}/${endpoint}`, data)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  },

  update: async <T>(
    endpoint: string,
    id: string,
    data: T
  ): Promise<ApiResponse<T>> => {
    const response = await api.put(`${API_BASE_URL}/${endpoint}/${id}`, data)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  },

  delete: async <T>(endpoint: string, id: string): Promise<ApiResponse<T>> => {
    const response = await api.delete(`${API_BASE_URL}/${endpoint}/${id}`)
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  },
}

export default apiService
