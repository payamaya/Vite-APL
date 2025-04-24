import { Navigate } from 'react-router-dom'
import * as Student from '../pages/Student'
// import { CourseDetails } from '../pages/Common'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { ROUTES } from './routePaths'
// import StudentCourseDetails from '../pages/Common/StudentCourseDetails'
export const studentRoutes = [
  { index: true, element: <Navigate to={ROUTES.STUDENT.DASHBOARD} replace /> },
  { path: ROUTES.STUDENT.DASHBOARD, element: <Student.StudentHome /> },
  // { path: ROUTES.STUDENT.COURSES, element: <Student.StudentCourses /> },
  { path: ROUTES.STUDENT.COURSES, element: <Student.StudentCourses /> },
  { path: 'courses/:courseId/module/:moduleId', element: <ModuleDetails /> },
]
