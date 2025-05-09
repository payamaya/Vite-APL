import * as User from '../pages/User'
import { Navigate } from 'react-router-dom'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { ROUTES } from './routePaths'

export const userRoutes = [
  {
    path: ROUTES.USER.ROOT,
    element: <User.UserDashboard />, // This should be the dashboard layout
    children: [
      {
        index: true,
        element: <User.UserHome />, // This will be shown in the dashboard's outlet
      },
      {
        path: ROUTES.USER.DASHBOARD,
        element: <Navigate to={ROUTES.USER.ROOT} replace />, // Redirect to root
      },
      {
        path: ROUTES.USER.COURSES,
        element: <User.UserCourses />,
      },
      {
        path: ROUTES.USER.COURSE_DETAILS,
        element: <User.UserCourseDetails />,
      },
      {
        path: ROUTES.USER.MODULE_DETAILS,
        element: <ModuleDetails />,
      },
    ],
  },
]
