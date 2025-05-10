import DashboardLayout from '../../Components/common/layouts/DashboardLayout'
import { useCourseManagement } from '../../hooks'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
  const { setCourses } = useCourseManagement()

  useEffect(() => {
    return () => {
      setCourses([])
    }
  }, [setCourses])

  return (
    <DashboardLayout role='student' title='Student Dashboard'>
      <Outlet />
    </DashboardLayout>
  )
}

export default StudentDashboard
