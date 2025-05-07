import apiService from './apiService'
import { DecodedToken, UserRole } from '../types'
import { ROLES } from '../constants/RolesEnum'

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
      const role = rawRole.toLowerCase() as UserRole

      if (!Object.values(ROLES).includes(role)) {
        throw new Error(`Invalid role received: ${rawRole}`)
      }

      localStorage.setItem('token', token)
      return { token, role }
    } catch (error) {
      throw new Error(`Invalid credentials: ${error}`)
    }
  },
  getUserRole: (): UserRole | null => {
    const token = authService.getToken()
    if (!token) return null

    try {
      const decodedToken = jwt_decode(token)
      console.warn('Decoded token role:', decodedToken.role) // Debug log

      // Handle case where role might be undefined or invalid
      //ERROR Must fix the backend with role
      if (!decodedToken.role) {
        console.warn('No role found in token')
        return null
      }

      // Convert to lowercase and validate
      const role = decodedToken.role.toLowerCase()
      if (!Object.values(ROLES).includes(role as UserRole)) {
        console.warn('Invalid role in token:', role)
        return null
      }

      return role as UserRole
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },
  logout: (): void => {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole') // Clear role on logout
  },

  getToken: (): string | null => {
    return localStorage.getItem('token')
  },

  isAuthenticated: (): boolean => {
    const token = authService.getToken()
    if (!token) return false
    return authService.isValidToken()
  },

  isValidToken: (): boolean => {
    const token = authService.getToken()
    if (!token) return false

    try {
      const decodedToken = jwt_decode(token)
      const isExpired = decodedToken.exp * 1000 < Date.now()

      console.log('Token expiry check:', {
        now: new Date(Date.now()),
        expires: new Date(decodedToken.exp * 1000),
        isExpired,
      })

      return !isExpired
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  },
}

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

export default authService
