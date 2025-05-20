import apiService from './apiService'
import { DecodedToken } from '../types'
import { ROLES, UserRoleValue } from '../constants/RolesEnum'
import { LoginResponse } from '../interfaces/api/ApiResponse'

const authService = {
  login: async (
    credentials: { email: string; password: string }
  ): Promise<{ token: string; role: UserRoleValue }> => {
    try {
      const response = await apiService.create<
        { email: string; password: string },
        LoginResponse
      >('auth/login', credentials)

      const { token, role: rawRole } = response.data

      // Immediately store the token as-is
      localStorage.setItem('token', token)

      // Normalize and validate role
      const normalizedRole = rawRole.toLowerCase()
      if (!Object.values(ROLES).includes(normalizedRole as UserRoleValue)) {
        throw new Error(`Invalid role received: ${rawRole}`)
      }

      localStorage.setItem('userRole', normalizedRole)

      return { token, role: normalizedRole as UserRoleValue }
    } catch (error) {
      throw new Error(
        `Invalid credentials: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  },

  getUserRole: (): UserRoleValue | null => {
    try {
      const token = localStorage.getItem('token')
      if (!token || token.split('.').length !== 3) {
        console.warn('No valid token found or token format is invalid')
        return null
      }

      const decodedToken = jwt_decode(token)
      if (!decodedToken.role) {
        console.warn('No role found in token')
        return null
      }

      const tokenRole = decodedToken.role.toLowerCase()
      if (!Object.values(ROLES).includes(tokenRole as UserRoleValue)) {
        console.warn('Invalid role in token:', tokenRole)
        return null
      }

      return tokenRole as UserRoleValue
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },

  logout: (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('sessionId')
  },

  getToken: (): string | null => {
    return localStorage.getItem('token')
  },

  setToken: (token: string): void => {
    localStorage.setItem('token', token)
  },

  setUserRole: (role: UserRoleValue): void => {
    localStorage.setItem('userRole', role)
  },

  isAuthenticated: (): boolean => {
    const token = authService.getToken()
    if (!token) return false
    return authService.isValidToken(token)
  },

  isValidToken: (token: string | null): boolean => {
    if (!token) return false
    try {
      const decodedToken = jwt_decode(token)
      return decodedToken.exp * 1000 > Date.now()
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  },

  clearSession: (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  },
}

// JWT decode helper
function jwt_decode(token: string): DecodedToken {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format')
  }

  const base64Url = parts[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload) as DecodedToken
}

export default authService
