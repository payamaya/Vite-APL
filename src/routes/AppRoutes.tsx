import { Route, Routes } from 'react-router-dom'

import {
  Home,
  About,
  Courses,
  CourseDetails,
  SetPasswordPage,
} from '../pages/Common'
import ModuleDetails from '../pages/Common/ModuleDetails'
import {
  adminRoutes,
  teacherRoutes,
  studentRoutes,
  ROUTES,
  RoleBasedRoutes,
  userRoutes,
} from '../routes'

import { ROLES } from '../constants/RolesEnum'
import VerifyEmailPage from '../pages/VerifyEmailPage'
import OTPVerificationPage from '../pages/OTPVerificationPage'
import NotFound from '../pages/NotFound'
import Unauthorized from '../pages/Unauthorized'

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
      {/* uSER Routes */}
      {RoleBasedRoutes({
        basePath: ROUTES.USER.ROOT,
        routes: userRoutes,
        allowedRoles: [ROLES.USER],
      })}
      {/* Common Routes */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.COURSES} element={<Courses />} />
      <Route path={ROUTES.COURSE_DETAILS} element={<CourseDetails />} />
      <Route path={ROUTES.MODULE_DETAILS} element={<ModuleDetails />} />

      <Route path={ROUTES.AUTH.CONFIRM_EMAIL} element={<VerifyEmailPage />} />
      <Route path={ROUTES.AUTH.VERIFY_OTP} element={<OTPVerificationPage />} />
      {/* Fallback */}
      <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
      <Route path={ROUTES.AUTH.SET_PASSWORD} element={<SetPasswordPage />} />

      {/*TODO later fix:Where Unauthorized is a component with guidance like "Please log in with the appropriate account."
       */}
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
