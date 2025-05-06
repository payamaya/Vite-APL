import { createContext, useContext, useState, useEffect } from 'react'
import authService from '../api/authService'
import { UserRole } from '../types'

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRole | null
  setAuthenticated: (auth: boolean, role?: UserRole | null) => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  setAuthenticated: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: authService.isAuthenticated(),
    userRole: authService.getUserRole(),
  })

  const setAuthenticated = (
    isAuthenticated: boolean,
    role?: UserRole | null
  ) => {
    setAuthState({
      isAuthenticated,
      userRole: role !== undefined ? role : authService.getUserRole(),
    })
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        isAuthenticated: authService.isAuthenticated(),
        userRole: authService.getUserRole(),
      })
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userRole: authState.userRole,
        setAuthenticated,
      }}
    >
      {children}
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
