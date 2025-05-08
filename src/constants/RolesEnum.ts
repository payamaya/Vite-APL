export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher', // Changed to lowercase
  STUDENT: 'student',
  GUEST: 'guest',
} as const

export type UserRoleValue = (typeof ROLES)[keyof typeof ROLES] // 'admin' | 'teacher' | 'student' | 'guest'
export type UserRole = keyof typeof ROLES // 'ADMIN' | 'TEACHER' | 'STUDENT' | 'GUEST'

/*
please fix:import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import authService from '../api/authService'
import { UserRoleValue } from '../constants/RolesEnum'

interface AuthContextType {
  isAuthenticated: boolean
  userRole: UserRoleValue | null
  isLoading: boolean
  setAuthenticated: (auth: boolean, role?: UserRoleValue | null) => void
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
    userRole: null as UserRoleValue | null,
    isLoading: true,
  })
  // Enhanced auth check function
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 9))
  const [authChannel] = useState(() => new BroadcastChannel('auth_channel'))

  const checkAuth = useCallback(() => {
    const token = authService.getToken(sessionId)
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
      userRole: storedRole,
      isLoading: false,
    })
  }, [sessionId])

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
    role?: UserRoleValue | null
  ) => {
    if (!isAuthenticated) {
      authService.clearSession(sessionId)
      authChannel.postMessage({ type: 'LOGOUT', sessionId })
    } else {
      authChannel.postMessage({ type: 'LOGIN', sessionId, role })
    }

    setAuthState(prev => ({
      ...prev,
      isAuthenticated,
      userRole: role ?? null,
    }));
  }, [sessionId, authChannel]);

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `token_${sessionId}`) {
        checkAuth();
      }
    };

    const handleAuthMessage = (e: MessageEvent) => {
      if (e.data.type === 'LOGOUT' && e.data.sessionId !== sessionId) {
        // Only clear local state if this isn't our own logout
        setAuthState({
          isAuthenticated: false,
          userRole: null,
          isLoading: false,
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    authChannel.addEventListener('message', handleAuthMessage);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      authChannel.removeEventListener('message', handleAuthMessage);
      authChannel.close();
    };
  }, [checkAuth, sessionId, authChannel]);


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

*/
