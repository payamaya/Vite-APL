// src/pages/student/Dashboard.tsx
import { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/common/layouts/DashboardLayout'
import { useCourseManagement } from '../../hooks/useCourseManagement'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { Outlet } from 'react-router-dom'

const StudentDashboard = () => {
  // Sample data - replace with real data from your API
  const { setCourses } = useCourseManagement()
  const [, setLoading] = useState(true)
  // const { courses, setCourses, setCurrentCourse } = useCourseManagement()
  const [, setError] = useState<Error | null>(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<Error | null>(null)

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
      {/* <div className='mb-5'>
        <h4>My Courses</h4>
        <ReusableTable
          data={courses}
          columns={courseColumns}
          searchPlaceholder='Search courses...'
        />
      </div>

      <div className='mb-5'>
        <h4>Notices</h4>
        <ReusableTable
          data={notices}
          columns={noticeColumns}
          searchPlaceholder='Search notices...'
        />
      </div> */}
      <Outlet />
    </DashboardLayout>
  )
}

export default StudentDashboard
