import { Navigate, Route, Routes } from 'react-router-dom'

import { Home, About, Courses, CourseDetails } from '../pages/Common'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { adminRoutes } from './adminRoutes'
import { studentRoutes } from './studentsRoutes'
import { ROUTES } from './routePaths'
import { teacherRoutes } from './teacherRoutes'
// import ProtectedRoute from '../Components/ProtectedRoute'
// import { ROLES } from '../contants/RolesEnum'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Route */}
      <Route
        path={ROUTES.ADMIN.ROOT}
        // element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}
      >
        {adminRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element}>
            {route.children?.map((childRoute, i) => (
              <Route key={i} {...childRoute} />
            ))}
          </Route>
        ))}
      </Route>

      {/* Teacher Route */}
      <Route
        path={ROUTES.TEACHER.ROOT}
        //TODO this is commented out so we can work in the commonent
        //  element={<ProtectedRoute allowedRoles={[ROLES.TEACHER]} />}
      >
        {teacherRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element}>
            {route.children?.map((childRoute, j) => (
              <Route key={j} {...childRoute} />
            ))}
          </Route>
        ))}
      </Route>

      {/* Student Routes */}
      <Route
        path={ROUTES.STUDENT.ROOT}
        // element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}
      >
        {studentRoutes.map((route, i) => (
          <Route key={i} path={route.path} element={route.element}>
            {route.children?.map((childRoute, j) => (
              <Route key={j} {...childRoute} />
            ))}
          </Route>
        ))}
      </Route>

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
