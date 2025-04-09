// src/api/authService.ts
import apiService from './apiService'
import { DecodedToken, UserRole } from '../types'

const authService = {
  login: async (credentials: {
    email: string
    password: string
  }): Promise<string> => {
    try {
      const response = await apiService.create('auth/login', credentials)
      const token = response.token
      localStorage.setItem('token', token)
      return token
    } catch (error) {
      throw new Error(`Invalid credentials: ${error}`)
    }
  },

  logout: (): void => {
    localStorage.removeItem('token')
  },

  getToken: (): string | null => localStorage.getItem('token'),

  isAuthenticated: (): boolean => !!localStorage.getItem('token'),

  getUserRole: (): UserRole | null => {
    const token = localStorage.getItem('token')
    if (!token) return null

    try {
      const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]))
      return decodedToken.role
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },

  // Add token validation method
  isValidToken: (): boolean => {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]))
      return decodedToken.exp * 1000 > Date.now()
    } catch (error) {
      console.log(`UnAthorized Token: ${error}`)
      return false
    }
  },
}

export default authService

// src/api/authService.ts
// import axios from 'axios'

// const API_URL = 'https://reqres.in/api' // Reqres base URL

// const authService = {
//   login: async (credentials: { email: string; password: string }): Promise<string> => {
//     try {
//       console.log('Posting to:', `${API_URL}/login`, credentials)

//       const response = await axios.post(`${API_URL}/login`, credentials)
//       const token = response.data.token
//       localStorage.setItem('token', token)
//       return token
//     } catch (error: any) {
//       console.error('Login failed', error)
//       // Instead of calling setError here, throw the error to be handled in the component
//       throw new Error(error.response?.data?.error || 'Login failed')
//     }
//   },

//   logout: (): void => {
//     localStorage.removeItem('token')
//   },

//   getToken: (): string | null => localStorage.getItem('token'),

//   isAuthenticated: (): boolean => !!localStorage.getItem('token'),
// }

// export default authService
