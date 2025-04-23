import { Navigate } from 'react-router-dom'
import * as Student from '../pages/Student'
export const studentRoutes = [
  { index: true, element: <Navigate to='dashboard' replace /> },
  { path: 'dashboard', element: <Student.StudentDashboard /> },
  { path: 'courses', element: <Student.StudentCourses /> },
]
