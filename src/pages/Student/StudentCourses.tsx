// StudentCourses.tsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/entities/ICourse'
import { ROUTES } from '../../routes/routePaths'
import { formatDate } from '../../utils/dateUtils'

const StudentCourses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await courseService.getAllCourses()
        setCourses(
          Array.isArray(response.data) ? response.data : [response.data]
        )
        setError(null)
      } catch (err) {
        setError('Failed to load courses. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div className='container mt-4'>
      <div className='card shadow-sm'>
        <div className='card-header bg-primary text-white'>
          <h2 className='h5 mb-0'>My Courses</h2>
        </div>

        <div className='card-body'>
          {loading && (
            <div className='text-center py-4'>
              <div className='spinner-border text-primary' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}

          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}

          {!loading && courses.length === 0 && (
            <div className='alert alert-info'>
              You are not enrolled in any courses yet.
            </div>
          )}

          {!loading && courses.length > 0 && (
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
              {courses.map((course) => (
                <div key={course.id} className='col'>
                  <Link
                    to={ROUTES.STUDENT.COURSE_DETAILS.replace(
                      ':courseId',
                      course.id
                    )}
                    className='text-decoration-none'
                  >
                    <div className='card h-100 shadow-sm hover-shadow transition'>
                      <div className='card-body'>
                        <h3 className='h5 card-title'>{course.name}</h3>
                        <h4 className='h6 text-muted'>{course.title}</h4>
                        <p className='card-text text-truncate'>
                          {course.description}
                        </p>
                      </div>
                      <div className='card-footer bg-transparent'>
                        <small className='text-muted'>
                          {formatDate(course.startDate)} -{' '}
                          {formatDate(course.endDate)}
                        </small>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentCourses
