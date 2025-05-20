import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { UserRoleValue } from '../constants/RolesEnum'
import authService from '../api/authService'

interface ProtectedRouteProps {
  allowedRoles?: UserRoleValue[]
  redirectPath?: string
  children?: React.ReactElement
}

const ProtectedRoute = ({
  allowedRoles = [],
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  const { isAuthenticated, userRole, isLoading } = useAuth()

  if (isLoading) {
    return <div>Verifying session...</div>
  }

  console.log('Route protection check:', {
    hasToken: !!authService.getToken(),
    tokenValid: authService.isValidToken(''),
    storedRole: userRole,
    freshRole: authService.getUserRole(),
  })

  // Primary authentication check
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  // Role-based access control
  if (allowedRoles.length > 0) {
    const effectiveRole = userRole || authService.getUserRole()

    if (!effectiveRole) {
      console.warn('Role missing but token valid - allowing access')
      return children ? children : <Outlet />
    }

    if (!allowedRoles.includes(effectiveRole)) {
      console.warn('Role not authorized:', effectiveRole)
      return <Navigate to='/unauthorized' replace />
    }
  }

  return children ? children : <Outlet />
}
export default ProtectedRoute
