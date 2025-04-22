import { Navigate } from 'react-router-dom'
import * as Teacher from '../pages/Teacher'
import { CourseDetails } from '../pages/Common'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { ROUTES } from './routePaths'

export const teacherRoutes = [
  { index: true, element: <Navigate to={ROUTES.TEACHER.DASHBOARD} replace /> },
  { path: ROUTES.TEACHER.DASHBOARD, element: <Teacher.TeacherHome /> },
  { path: ROUTES.TEACHER.COURSES, element: <Teacher.TeacherCourses /> },
  { path: ROUTES.TEACHER.NOTICES, element: <Teacher.TeacherNotice /> },
  { path: 'courses/:courseId', element: <CourseDetails /> },
  { path: 'courses/:courseId/module/:moduleId', element: <ModuleDetails /> },
]
