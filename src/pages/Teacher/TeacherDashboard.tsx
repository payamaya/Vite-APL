// src/pages/teacher/Dashboard.tsx
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../Components/common/DashboardLayout'
// import ReusableTable from '../../Components/common/tables/ReusableTable'

import { useEffect, useState } from 'react'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { useCourseManagement } from '../../hooks/useCourseManagement'
// import courseTableColumns from '../../Components/common/tables/courseTableColumns'
const TeacherDashboard = () => {
  // , handleSubmit
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
    <DashboardLayout role='teacher' title='Teacher Dashboard'>
      {/* <div className='mb-5'>
        <h4>My Courses</h4>
        {loading && <p>Loading courses...</p>}
        {error && <p className='text-danger'>Error loading courses</p>}
        {!loading && !error && (
          <ReusableTable
            data={courses}
            columns={courseTableColumns}
            searchPlaceholder='Search courses...'
            onRowClick={(course) => setCurrentCourse(course)}
          />
        )}
      </div> */}

      <Outlet />
    </DashboardLayout>
  )
}

export default TeacherDashboard
