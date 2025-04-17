import { Navigate, Route, Routes } from 'react-router-dom'

import { Home, About, Courses, CourseDetails } from '../pages/Common'
import * as Admin from '../pages/Admin'
import * as Teacher from '../pages/Teacher'
import * as Student from '../pages/Student'
import ProtectedRoute from '../Components/ProtectedRoute'
import ModuleDetails from '../pages/Common/ModuleDetails'

const AppRoutes = () => {
  const adminRoutes = [
    { index: true, element: <Navigate to='dashboard' replace /> },
    { path: 'dashboard', element: <Admin.AdminDashboard /> },
    { path: 'users', element: <Admin.AdminUser /> },
  ]

  // const teacherRoutes = [
  //   { index: true, element: <Navigate to='dashboard' replace /> },
  //   { path: 'dashboard', element: <Teacher.TeacherDashboard /> },
  //   { path: 'courses', element: <Teacher.TeacherCourses /> },
  // ]

  const studentRoutes = [
    { index: true, element: <Navigate to='dashboard' replace /> },
    { path: 'dashboard', element: <Student.StudentDashboard /> },
    { path: 'courses', element: <Student.StudentCourses /> },
  ]

  return (
    <Routes>
      {/* Admin Route */}
      <Route
        path='/admin'
        element={<ProtectedRoute allowedRoles={['admin']} />}
      >
        {adminRoutes.map((route) => (
          <Route key={route.path || 'index'} {...route} />
        ))}
      </Route>
      {/* Teacher Route */}
      // Teacher Route Setup with Nested Routes
      <Route path='/teacher' element={<Teacher.TeacherDashboard />}>
        <Route index element={<Navigate to='dashboard' replace />} />
        <Route path='dashboard' element={<Teacher.TeacherHome />} />
        <Route path='courses' element={<Teacher.TeacherCourses />} />

        <Route path='notice' element={<Teacher.TeacherNotice />} />

        <Route path='courses/:courseId' element={<CourseDetails />} />
        <Route
          path='courses/:courseId/module/:moduleId'
          element={<ModuleDetails />}
        />
      </Route>
      {/* Student Route */}
      <Route
        path='/student'
        element={<ProtectedRoute allowedRoles={['student']} />}
      >
        {studentRoutes.map((route) => (
          <Route key={route.path || 'index'} {...route} />
        ))}
      </Route>
      {/* Common Routes */}
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/courses/:courseId' element={<CourseDetails />} />
      <Route
        path='/courses/:courseId/module/:moduleId'
        element={<ModuleDetails />}
      />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default AppRoutes
