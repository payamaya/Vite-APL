import * as Student from '../pages/Student'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { ROUTES } from './routePaths'
import { Navigate } from 'react-router-dom'

export const studentRoutes = [
  {
    path: ROUTES.STUDENT.ROOT,
    element: <Student.StudentDashboard />, // This should be the dashboard layout
    children: [
      {
        index: true,
        element: <Student.StudentHome />, // This will be shown in the dashboard's outlet
      },
      {
        path: ROUTES.STUDENT.DASHBOARD,
        element: <Navigate to={ROUTES.STUDENT.ROOT} replace />, // Redirect to root
      },
      {
        path: ROUTES.STUDENT.COURSES,
        element: <Student.StudentCourses />,
      },
      {
        path: ROUTES.STUDENT.COURSE_DETAILS,
        element: <Student.CourseDetails />,
      },
      {
        path: ROUTES.STUDENT.MODULE_DETAILS,
        element: <ModuleDetails />,
      },
    ],
  },
]
