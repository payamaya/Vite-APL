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
  redirectPath = '/dasboard',
  children,
}: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  if (
    allowedRoles.length > 0 &&
    (!userRole || !allowedRoles.includes(userRole))
  ) {
    return <Navigate to='/unauthorized' replace />
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
