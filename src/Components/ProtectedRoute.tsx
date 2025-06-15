import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { UserRoleValue } from '../constants/RolesEnum'
import authService from '../api/authService'

interface ProtectedRouteProps {
  allowedRoles?: UserRoleValue[]
  redirectPath?: string
  children?: React.ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles = [],
  redirectPath = '/',
  children,
}) => {
  const { isAuthenticated, userRole, isLoading } = useAuth()
  const token = authService.getToken()

  if (isLoading) {
    return <div>Loading...</div>
  }

  // Debug logging with normalized values
  console.log('ProtectedRoute check:', {
    tokenExists: !!token,
    tokenValid: token ? authService.isValidToken(token) : false,
    isAuthenticated,
    contextRole: userRole,
    normalizedContextRole: userRole?.toLowerCase(),
    localStorageRole: localStorage.getItem('userRole'),
    normalizedLocalStorageRole: localStorage.getItem('userRole')?.toLowerCase(),
    tokenRole: token ? authService.getUserRole() : null,
    allowedRoles,
  })

  // Primary authentication check
  if (!token || !authService.isValidToken(token) || !isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  // Role check if required
  if (allowedRoles.length > 0) {
    // Get role from multiple sources and normalize to lowercase
    const currentRole = (
      userRole ||
      localStorage.getItem('userRole') ||
      authService.getUserRole()
    )?.toLowerCase()

    // Check if current role matches any allowed role
    const hasAccess =
      currentRole &&
      allowedRoles.some(
        (allowedRole) => allowedRole.toLowerCase() === currentRole
      )

    if (!hasAccess) {
      console.warn(
        `Access denied. Required roles: ${allowedRoles}, User role: ${currentRole}`
      )
      return <Navigate to='/unauthorized' replace />
    }
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
