import { Navigate } from 'react-router-dom'
import * as Admin from '../pages/Admin' // Adjust the path as necessary

export const adminRoutes = [
  { index: true, element: <Navigate to='dashboard' replace /> },
  { path: 'dashboard', element: <Admin.AdminDashboard /> },
  { path: 'users', element: <Admin.AdminUser /> },
]
