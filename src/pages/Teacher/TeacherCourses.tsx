import { useEffect, useState } from 'react'
import { ICourse } from '../../interfaces/components/ICourse'

import courseService from '../../services/coursesService'
import ReusableTable from '../../Components/common/tables/ReusableTable'
import courseTableColumns from '../../Components/common/tables/courseTableColumns'

const TeacherCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

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
  }, [])

  return (
    <main className='container'>
      <article className='row'>
        <section className='col-12 w-full d-flex justify-content-center'>
          <div className='card border-primary'>
            <header>
              <h1 id='dashboard-header'>Teacher Courses</h1>
            </header>

            <div className='card-body'>
              <h5 className='h5 d-flex justify-content-center'>
                Teacher courses goes here
              </h5>
            </div>
          </div>
        </section>
      </article>

      <article
        className='row w-100 justify-content-center my-4'
        aria-labelledby='courses-section'
      >
        <section className='col-12'>
          <div className='card shadow-sm'>
            <header className='card-header bg-warning text-white'>
              <h5 id='courses-section' className='h5'>
                Your Courses
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
                  onRowClick={(course) =>
                    console.log('Selected course:', course)
                  }
                />
              )}
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}

export default TeacherCourses
