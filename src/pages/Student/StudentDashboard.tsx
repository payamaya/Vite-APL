// StudentDashboard.tsx
import DashboardLayout from '../../Components/common/layouts/DashboardLayout'
import { useCourseManagement } from '../../hooks/useCourseManagement'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
  const { setCourses } = useCourseManagement()

  useEffect(() => {
    // The actual course fetching is now handled in the specific components
    // This ensures we don't fetch data we might not need
    return () => {
      // Cleanup if needed
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
