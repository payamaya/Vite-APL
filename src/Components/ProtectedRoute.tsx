import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserRole } from '../types'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  redirectPath?: string
  children?: React.ReactElement
}

const ProtectedRoute = ({
  allowedRoles = [],
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth()

  // Debug logs
  console.log('ProtectedRoute check:', {
    isAuthenticated,
    userRole,
    allowedRoles,
    hasRequiredRole:
      allowedRoles.length > 0 && userRole && allowedRoles.includes(userRole),
  })

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  if (
    allowedRoles.length > 0 &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    console.warn('Unauthorized access attempt', {
      required: allowedRoles,
      actual: userRole,
    })
    return <Navigate to='/unauthorized' replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
