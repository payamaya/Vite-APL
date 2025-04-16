import { Navigate, Outlet } from 'react-router-dom'
import authService from '../api/authService'
import { UserRole } from '../types'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  redirectPath?: string
  children?: React.ReactElement
}

const ProtectedRoute = ({
  allowedRoles = [], // Default to empty array to avoid errors when it's not provided
  redirectPath = '/', // Default to home if no custom redirect path
  children,
}: ProtectedRouteProps) => {
  const userRole = authService.getUserRole() // Fetch the current user role
  const isAuthenticated = authService.isAuthenticated() // Check if the user is authenticated

  // If not authenticated, redirect to the specified path (e.g., login page)
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  // If user role isn't in allowedRoles or if no userRole, redirect to the unauthorized page
  if (
    allowedRoles.length > 0 &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    return <Navigate to='/unauthorized' replace />
  }

  // If everything checks out, render the children or Outlet for nested routes
  return children ? children : <Outlet />
}

export default ProtectedRoute
