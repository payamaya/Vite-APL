import { useEffect, useState } from 'react'
import { ICourse } from '../../interfaces/components/entities'

import { courseService } from '../../services'
import ReusableTable from '../../Components/common/tables/ReusableTable'
import courseTableColumns from '../../Components/common/tables/courseTableColumns'

const TeacherCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

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
  }, [])

  return (
    <>
      <section className='border border-2 border-primary rounded'>
        <div className='card shadow-sm'>
          <header className='card-header bg-primary text-white'>
            <h5 id='dashboard-header' className='h5'>
              Teacher Dashboard Courses
            </h5>
          </header>

          <div className='card-body'>
            {loading && (
              <p className='text-center' role='status'>
                Loading...
              </p>
            )}
            {error && (
              <div className='alert alert-danger' role='alert'>
                Errorr....
              </div>
            )}
            {courses.length === 0 && !loading && !error && (
              <div className='alert alert-info' role='status'>
                You haven't created any courses yet.
              </div>
            )}
            {courses.length > 0 && (
              <ReusableTable
                data={courses}
                columns={courseTableColumns}
                searchPlaceholder='Search Courses...'
                onRowClick={(course) => console.log('Selected course:', course)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default TeacherCourses
