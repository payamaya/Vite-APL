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
