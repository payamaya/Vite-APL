import { Navigate } from 'react-router-dom'
import * as Admin from '../pages/Admin' // Adjust the path as necessary
import { ROUTES } from './routePaths'
import ModuleDetails from '../pages/Common/ModuleDetails'

export const adminRoutes = [
  {
    path: ROUTES.ADMIN.ROOT,
    element: <Admin.AdminDashboard />,
    children: [
      {
        index: true,
        element: <Admin.AdminManageCourse />,
      },
      {
        path: ROUTES.ADMIN.DASHBOARD,
        element: <Navigate to={ROUTES.ADMIN.ROOT} replace />,
      },
      {
        path: ROUTES.ADMIN.COURSES,
        element: <Admin.AdminCourses />,
      },
      {
        path: ROUTES.ADMIN.MANAGE_TEACHER,
        element: <Admin.AdminManageTeacher />,
      },
      {
        path: ROUTES.ADMIN.MANAGE_STUDENT,
        element: <Admin.AdminManageStudent />,
      },
      {
        path: ROUTES.ADMIN.MANAGE_USER,
        element: <Admin.AdminManageUser />,
      },

      {
        path: ROUTES.ADMIN.MODULE_DETAILS,
        element: <ModuleDetails />,
      },
    ],
  },
]
