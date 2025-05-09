import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import authService from '../api/authService'
import { UserRoleValue } from '../contants/RolesEnum'

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRoleValue | null
  isLoading: boolean
  sessionId: string
  setAuthenticated: (auth: boolean, role?: UserRoleValue | null) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null as UserRoleValue | null,
    isLoading: true,
  })

  const [sessionId, setSessionId] = useState(() => {
    const existingSession = localStorage.getItem('sessionId')
    if (existingSession) return existingSession

    const newSessionId = Math.random().toString(36).substring(2, 9)
    localStorage.setItem('sessionId', newSessionId)
    return newSessionId
  })
  const authChannelRef = useRef<BroadcastChannel | null>(
    new BroadcastChannel('auth_channel')
  )

  const checkAuth = useCallback(() => {
    const token = authService.getToken()
    const storedRole = authService.getUserRole(sessionId)

    if (!token || !authService.isValidToken(token)) {
      setAuthState({
        isAuthenticated: false,
        userRole: null,
        isLoading: false,
      })
      return
    }

    setAuthState({
      isAuthenticated: true,
      userRole: storedRole as UserRoleValue,
      isLoading: false,
    })
  }, [sessionId])

  const setAuthenticated = useCallback(
    (isAuthenticated: boolean, role?: UserRoleValue | null) => {
      if (!isAuthenticated) {
        authService.clearSession(sessionId)
        authChannelRef.current?.postMessage({ type: 'LOGOUT', sessionId })
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          isLoading: false,
        })
      } else {
        authService.setToken('valid_token')
        if (role) {
          authService.setUserRole(sessionId, role)
        }

        authChannelRef.current?.postMessage({ type: 'LOGIN', sessionId, role })
        setAuthState({
          isAuthenticated: true,
          userRole: role ?? null,
          isLoading: false,
        })
      }
    },
    [sessionId]
  )

  const logout = useCallback(() => {
    localStorage.removeItem('sessionId')
    setSessionId('') // optionally reset state
    setAuthenticated(false, null)
  }, [setAuthenticated])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `token_${sessionId}`) {
        checkAuth()
      }
    }

    const handleAuthMessage = (e: MessageEvent) => {
      if (e.data.type === 'LOGOUT' && e.data.sessionId !== sessionId) {
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          isLoading: false,
        })
      }
    }

    window.addEventListener('storage', handleStorageChange)
    authChannelRef.current?.addEventListener('message', handleAuthMessage)

    checkAuth()

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      authChannelRef.current?.removeEventListener('message', handleAuthMessage)
      authChannelRef.current?.close()
      authChannelRef.current = null
    }
  }, [checkAuth, sessionId])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        userRole: authState.userRole,
        isLoading: authState.isLoading,
        sessionId,
        setAuthenticated,
        logout,
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
