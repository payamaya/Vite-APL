import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Courses from '../pages/Courses'
import CourseDetails from '../pages/CourseDetails'
// import AdminDashboard from '../pages/Admin/AdminDashboard'
// import TeacherDashboard from '../pages/Teacher/TeacherDashboard'
// import StudentDashboard from '../pages/Student/StudentDashboard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/courses' element={<Courses />} />
      <Route path='/courses/:courseID' element={<CourseDetails />} />

      {/* Role-based Routes */}
      {/* <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/teacher/dashboard' element={<TeacherDashboard />} />
      <Route path='/student/dashboard' element={<StudentDashboard />} /> */}
    </Routes>
  )
}

export default AppRoutes
