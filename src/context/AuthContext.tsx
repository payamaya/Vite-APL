import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import authService from '../api/authService'
import { UserRole } from '../types'

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRole | null
  isLoading: boolean
  setAuthenticated: (auth: boolean, role?: UserRole | null) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  isLoading: true,
  setAuthenticated: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null as UserRole | null,
    isLoading: true,
  })
  // Enhanced auth check function
  const checkAuth = useCallback(() => {
    const token = authService.getToken()
    if (!token) {
      setAuthState({
        isAuthenticated: false,
        userRole: null,
        isLoading: false,
      })
      return
    }

    // Verify token first
    if (!authService.isValidToken()) {
      setAuthState({
        isAuthenticated: false,
        userRole: null,
        isLoading: false,
      })
      return
    }
    // Then get role
    const userRole = authService.getUserRole()
    setAuthState({
      isAuthenticated: true,
      userRole,
      isLoading: false,
    })
  }, [])

  useEffect(() => {
    // Initial check with more reliable timing
    const timer = setTimeout(() => {
      checkAuth()
    }, 150) // Slightly longer delay for more reliability

    // Storage event listener for cross-tab sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [checkAuth])

  const setAuthenticated = (
    isAuthenticated: boolean,
    role?: UserRole | null
  ) => {
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated,
      userRole: role ?? authService.getUserRole(),
    }))
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userRole: authState.userRole,
        isLoading: authState.isLoading,
        setAuthenticated,
      }}
    >
      {authState.isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
