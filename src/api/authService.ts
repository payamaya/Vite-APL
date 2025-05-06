/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService from './apiService'
import { DecodedToken, UserRole } from '../types'
import { ROLES } from '../contants/RolesEnum'
// import { AuthResponse } from '../interfaces/api/AuthResponse'

const authService = {
  login: async (credentials: {
    email: string
    password: string
  }): Promise<{ token: string; role: UserRole }> => {
    try {
      const response = await apiService.create<
        { email: string; password: string },
        { token: string; role: string; expiresAt: string }
      >('auth/login', credentials)

      const { token, role: rawRole } = response.data

      // Normalize role to match your UserRole type
      const role = rawRole.toLowerCase() as UserRole

      // Validate the role
      if (!Object.values(ROLES).includes(role)) {
        throw new Error(`Invalid role received: ${rawRole}`)
      }

      localStorage.setItem('token', token)
      return { token, role }
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
      // const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]))
      const decodedToken: DecodedToken = jwt_decode(token)
      return decodedToken.role
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },

  isValidToken: (): boolean => {
    const token = localStorage.getItem('token')
    if (!token) return false

    try {
      const decodedToken: DecodedToken = jwt_decode(token)
      return decodedToken.exp * 1000 > Date.now()
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error.message || 'Login failed'
      throw new Error(message)
    }
  },
}
export default authService
function jwt_decode(token: string): DecodedToken {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload) as DecodedToken
}
