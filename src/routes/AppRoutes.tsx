import { Navigate, Route, Routes } from 'react-router-dom'

import { Home, About, Courses, CourseDetails } from '../pages/Common'
import ModuleDetails from '../pages/Common/ModuleDetails'
import {
  adminRoutes,
  teacherRoutes,
  studentRoutes,
  ROUTES,
  RoleBasedRoutes,
} from '../routes'

import { ROLES } from '../constants/RolesEnum'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Route */}

      {RoleBasedRoutes({
        basePath: ROUTES.ADMIN.ROOT,
        routes: adminRoutes,
        allowedRoles: [ROLES.ADMIN],
      })}
      {/* Teacher Route */}
      {RoleBasedRoutes({
        basePath: ROUTES.TEACHER.ROOT,
        routes: teacherRoutes,
        allowedRoles: [ROLES.TEACHER],
      })}

      {/* Student Routes */}
      {RoleBasedRoutes({
        basePath: ROUTES.STUDENT.ROOT,
        routes: studentRoutes,
        allowedRoles: [ROLES.STUDENT],
      })}

      {/* Common Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.COURSES} element={<Courses />} />
      <Route path={ROUTES.COURSE_DETAILS} element={<CourseDetails />} />
      <Route path={ROUTES.MODULE_DETAILS} element={<ModuleDetails />} />

      {/* Fallback */}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to='/' replace />} />
      {/*TODO later fix:Where Unauthorized is a component with guidance like "Please log in with the appropriate account."
       <Route path='/unauthorized' element={<Unauthorized />} /> */}
    </Routes>
  )
}

export default AppRoutes
