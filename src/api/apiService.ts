/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import API_BASE_URL from './apiConfig'
import authService from './authService'
import { ApiResponse } from '../interfaces/api/ApiResponse'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// api.interceptors.request.use((config) => {
//   const token = authService.getToken()     // <-- This is not receiving the token
//   //const token = localStorage.getItem('token') 
//   //console.log('Interceptor fired. Token:', token)
//   if (token && config.headers) {
//     if (!authService.isValidToken(token)) {
//       authService.logout(token) // Optional: redirect to login
//       throw new Error('Token expired. Please login again.')
//     }
//     config.headers['Authorization'] = `Bearer ${token}`
//   }
//   return config
// })

api.interceptors.request.use((config) => {
   if (config.url?.includes('auth/login')) {
    return config // skip token
  }
  const token = authService.getToken()

  console.log('%c[Interceptor]', 'color: cyan', {
    tokenFromAuthService: token,
    localStorageToken: localStorage.getItem('token'),
    url: config.url,
    method: config.method,
    headersBefore: { ...config.headers }
  })

  if (token && config.headers) {
    if (!authService.isValidToken(token)) {
      console.warn('[Interceptor] Token is invalid or expired. Logging out.')
      authService.logout()
      throw new Error('Token expired. Please login again.')
    }

    config.headers['Authorization'] = `Bearer ${token}`
    console.log('%c[Interceptor] Authorization header added.', 'color: green', {
      headersAfter: config.headers
    })
  } else {
    console.warn('%c[Interceptor] No valid token found.', 'color: orange')
  }

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

  getAll: async <T>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get<T>(endpoint, { params })
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
