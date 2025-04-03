import { Navigate, Outlet } from 'react-router-dom'
import authService from '../api/authService'
import { UserRole } from '../types'

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]
  redirectPath?: string
  children?: React.ReactElement
}
const ProtectedRoute = ({
  allowedRoles,
  redirectPath = '/',
  children,
}: ProtectedRouteProps) => {
  const UserRole = authService.getUserRole()
  const isAuthenticated = authService.isAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  if (allowedRoles && (!UserRole || !allowedRoles.includes(UserRole))) {
    return <Navigate to='/unathorized' replace />
  }
  return children ? children : <Outlet />
}
export default ProtectedRoute
