import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../Components/common/layouts/DashboardLayout'
import { useEffect, useState } from 'react'
import { courseService } from '../../services'

import { useCourseManagement } from '../../hooks'

const UserDashboard = () => {
  const { setCourses } = useCourseManagement()
  const [, setLoading] = useState(true)
  const [, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses()
        setCourses(
          Array.isArray(response.data) ? response.data : [response.data]
        )
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [setCourses])

  return (
    <DashboardLayout role='user' title='User Dashboard'>
      <Outlet />
    </DashboardLayout>
  )
}

export default UserDashboard
