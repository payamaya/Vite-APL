import { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/common/layouts/DashboardLayout'
import { useCourseManagement } from '../../hooks/useCourseManagement'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
  const { setCourses } = useCourseManagement()
  const [, setLoading] = useState(true)
  const [, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses<ICourse[]>()
        setCourses(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [setCourses])

  return (
    <DashboardLayout role='student' title='Student Dashboard'>
      <Outlet />
    </DashboardLayout>
  )
}

export default StudentDashboard
