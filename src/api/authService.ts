import axios from 'axios'
import API_BASE_URL from './apiConfig'
import { DecodedToken } from '../types'
import { ROLES, UserRoleValue } from '../constants/RolesEnum'

const authService = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/login`,
        credentials,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )

      // Verify the response contains a valid token
      if (!response.data?.token) {
        throw new Error('No token received in login response')
      }

      // Quick validation of token structure
      if (response.data.token.split('.').length !== 3) {
        throw new Error('Invalid token format received from server')
      }

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login error:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        })
        throw new Error(error.response?.data?.message || error.message)
      }
      throw error
    }
  },

  setPassword: async (password: string) => {
    const token = authService.getToken()
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/set-password`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      return {
        success: response.data.success,
        message: response.data.message || 'Password set successfully',
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          'Failed to set password'
      )
    }
  },

  // In authService.ts
  getUserRole: (): UserRoleValue | null => {
    try {
      const token = authService.getToken()
      if (!token) return null

      try {
        const decoded = jwt_decode(token)
        if (!decoded?.role) return null

        // Normalize role to lowercase
        const role = decoded.role.toString().toLowerCase()

        // Check against valid roles
        return Object.values(ROLES).includes(role as UserRoleValue)
          ? (role as UserRoleValue)
          : null
      } catch (decodeError) {
        console.error('Token decode error:', decodeError)
        return null
      }
    } catch (error) {
      console.error('Error getting user role:', error)
      return null
    }
  },

  logout: (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  },

  getToken: (): string | null => localStorage.getItem('token'),

  setToken: (token: string): void => localStorage.setItem('token', token),

  setUserRole: (role: UserRoleValue): void =>
    localStorage.setItem('userRole', role),

  isAuthenticated: (): boolean => {
    const token = authService.getToken()
    return token ? authService.isValidToken(token) : false
  },

  isValidToken: (token: string | null): boolean => {
    if (!token) return false

    try {
      const decoded = jwt_decode(token)

      // Verify expiration exists and is a number
      if (typeof decoded.exp !== 'number') {
        console.warn('Token missing expiration')
        return false
      }

      return decoded.exp * 1000 > Date.now()
    } catch (error) {
      console.error('Invalid token:', error)
      return false
    }
  },

  clearSession: (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  },
}

function jwt_decode(token: string): DecodedToken {
  try {
    // Verify token has 3 parts
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format: Token must have 3 parts')
    }

    const base64Url = parts[1]
    if (!base64Url) {
      throw new Error('Invalid JWT format: Missing payload')
    }

    // Replace URL-safe characters
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    // Decode base64
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )

    // Parse and verify the decoded payload
    const decoded = JSON.parse(jsonPayload)

    if (typeof decoded !== 'object' || decoded === null) {
      throw new Error('Invalid JWT payload: Expected an object')
    }

    return decoded as DecodedToken
  } catch (error) {
    console.error('JWT decode error:', error)
    throw new Error(
      `Failed to decode token: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

export default authService
