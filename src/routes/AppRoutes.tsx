import { Navigate, Route, Routes } from 'react-router-dom'

import { Home, About, Courses, CourseDetails } from '../pages/Common'
import ModuleDetails from '../pages/Common/ModuleDetails'
import { adminRoutes } from './adminRoutes'
import { studentRoutes } from './studentsRoutes'
import { ROUTES } from './routePaths'
import { teacherRoutes } from './teacherRoutes'
import ProtectedRoute from '../Components/ProtectedRoute'
import { ROLES } from '../contants/RolesEnum'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Admin Route */}
      <Route
        path={ROUTES.ADMIN.ROOT}
        // element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}
        // element={<ProtectedRoute allowedRoles={['admin']} />}
      >
        {adminRoutes.map((route) => (
          <Route key={route.path || 'index'} {...route} />
        ))}
      </Route>
      {/* Teacher Route */}

      {/* <Route path='/teacher' element={<Teacher.TeacherDashboard />}>
        <Route index element={<Navigate to='dashboard' replace />} />
        <Route path='dashboard' element={<Teacher.TeacherHome />} />
        <Route path='courses' element={<Teacher.TeacherCourses />} />

        <Route path='notices' element={<Teacher.TeacherNotice />} />

        <Route path='courses/:courseId' element={<CourseDetails />} />
        <Route
          path='courses/:courseId/module/:moduleId'
          element={<ModuleDetails />}
        />
      </Route> */}
      <Route
        path={ROUTES.TEACHER.ROOT}
        //TODO this is commented out so we can work in the commonent
        //  element={<ProtectedRoute allowedRoles={[ROLES.TEACHER]} />}
      >
        {teacherRoutes.map((route) => (
          <Route key={route.path || 'index'} {...route} />
        ))}
      </Route>
      {/* Student Routes */}
      <Route
        path={ROUTES.STUDENT.ROOT}
        // element={<ProtectedRoute allowedRoles={[ROLES.STUDENT]} />}
      >
        {studentRoutes.map((route) => (
          <Route key={route.path || 'index'} {...route} />
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
