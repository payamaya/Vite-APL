import { Navigate } from 'react-router-dom'
import * as Teacher from '../pages/Teacher'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { ROUTES } from './routePaths'

export const teacherRoutes = [
  {
    path: ROUTES.TEACHER.ROOT,
    element: <Teacher.TeacherDashboard />, // This should be the dashboard layout
    children: [
      {
        index: true,
        element: <Teacher.TeacherHome />, // This will be shown in the dashboard's outlet
      },
      {
        path: ROUTES.TEACHER.DASHBOARD,
        element: <Navigate to={ROUTES.TEACHER.ROOT} replace />, // Redirect to root
      },
      {
        path: ROUTES.TEACHER.COURSES,
        element: <Teacher.TeacherCourses />,
      },
      {
        path: ROUTES.TEACHER.COURSE_DETAILS,
        element: <Teacher.TeacherCourseDetails />,
      },
      {
        path: ROUTES.TEACHER.MODULE_DETAILS,
        element: <ModuleDetails />,
      },
    ],
  },
]
