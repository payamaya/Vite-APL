import { Navigate, Route, Routes } from 'react-router-dom'

import { Home, About, Courses, CourseDetails } from '../pages/Common'
import * as Admin from '../pages/Admin'
import ProtectedRoute from '../Components/ProtectedRoute'
import ModuleDetails from '../pages/Common/ModuleDetails'

const AppRoutes = () => {
  const adminRoutes = [
    { index: true, element: <Navigate to='dashboard' replace /> },
    {
      path: 'dashboard',
      element: <Admin.AdminDashboard />,
    },
    {
      path: 'users',
      element: <Admin.AdminUser />,
    },
  ]
  return (
    <Routes>
      <Route
        path='/admin'
        element={<ProtectedRoute allowedRoles={['admin']} />}
      >
        {adminRoutes.map((route) => (
          <Route key={route.path || 'index'} {...route} />
        ))}
      </Route>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/courses/:courseId' element={<CourseDetails />} />
      <Route
        path='/courses/:courseId/module/:moduleId'
        element={<ModuleDetails />}
      />
      {/* 404 Not Found - should be last */}
      <Route path='*' element={<Navigate to='/' replace />} />

      {/* Role-based Routes */}
      {/* <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
      <Route path='/student/dashboard' element={<StudentDashboard />} /> */}
    </Routes>
  )
}

export default AppRoutes
