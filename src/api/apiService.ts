/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import API_BASE_URL from './apiConfig'
import authService from './authService'
import { ApiResponse } from '../interfaces/api/ApiResponse'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = authService.getToken()
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  console.log('Request URL:', config.baseURL, config.url)
  return config
})

const handleError = <T>(error: any): Promise<ApiResponse<T>> => {
  console.error('API error: ', error)
  const message =
    error?.response?.data?.message || error?.message || 'Something went wrong'

  return Promise.reject({
    data: null as unknown as T,
    status: error?.response?.status || 500,
    statusText: error?.response?.statusText || 'Internal Server Error',
    headers: error?.response?.headers || {},
    message,
  } as ApiResponse<T>)
}

const apiService = {
  getAll: async <T>(endpoint: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<T>(endpoint)
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        message: (response.data as any)?.message,
      }
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  getById: async <T>(endpoint: string, id: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<T>(`${endpoint}/${id}`)
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        message: (response.data as any)?.message,
      }
    } catch (error: any) {
      return handleError<T>(error)
    }
  },

  create: async <RequestType, ResponseType = RequestType>(
    endpoint: string,
    data: RequestType
  ): Promise<ApiResponse<ResponseType>> => {
    try {
      const response = await api.post<ResponseType>(endpoint, data) // No baseURL needed here either
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        message: (response.data as any)?.message,
      }
    } catch (error: any) {
      return handleError<ResponseType>(error)
    }
  },

  update: async <RequestType, ResponseType = RequestType>(
    endpoint: string,
    id: string,
    data: RequestType
  ): Promise<ApiResponse<ResponseType>> => {
    try {
      const response = await api.put<ResponseType>(`${endpoint}/${id}`, data) // Same issue as above
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        message: (response.data as any)?.message,
      }
    } catch (error: any) {
      return handleError<ResponseType>(error)
    }
  },

  delete: async <T>(endpoint: string, id: string): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete<T>(`${endpoint}/${id}`)
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        message: (response.data as any)?.message,
      }
    } catch (error: any) {
      return handleError<T>(error)
    }
  },
}

export default apiService
