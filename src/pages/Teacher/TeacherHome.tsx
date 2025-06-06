import { useEffect, useState } from 'react'
import { courseService } from '../../services'
import { ICourse } from '../../interfaces/components/entities/ICourse'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routePaths'
import { formatDate } from '../../utils/dateUtils'

const TeacherHome = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<ICourse[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await courseService.getAllCourses()

        if (Array.isArray(response.data)) {
          setCourses(response.data)
        } else {
          setError('Invalid response data while loading courses.')
        }
      } catch (err) {
        setError(`${err}: Failed to load courses`)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <section className='row ' aria-labelledby='courses-section'>
      <header className='card-header bg-primary text-white'>
        <h1 id='dashboard-header' className='d-flex justify-content-center'>
          Teacher Dashboard
        </h1>
      </header>

      <div className='card-body'>
        <h5 className='h5 d-flex justify-content-center'>
          Welcome, Teacher! Here's your dashboard overview.
        </h5>
      </div>

      <section
        className='border border-2 border-primary rounded w-100'
        style={{ maxWidth: '1200px' }}
      >
        <div className='shadow-sm p-3'>
          {loading && (
            <p className='text-center' role='status'>
              Loading courses...
            </p>
          )}
          {error && (
            <div className='alert alert-danger' role='alert'>
              {error}
            </div>
          )}

          {courses.length === 0 ? (
            <div className='alert alert-info' role='status'>
              You haven't created any courses yet.
            </div>
          ) : (
            <ul className='row row-cols-1 row-cols-md-2 row-cols-lg-3 p-0 m-0 d-flex align-items-center justify-content-evenly'>
              {courses.map((course) => (
                <li
                  key={course.id}
                  className='col list-group-item w-50 m-2'
                  style={{ listStyleType: 'none' }}
                >
                  <div className='card h-100 shadow-sm'>
                    <div className='card-body'>
                      <h3>Title: {course.title}</h3>
                      <h4>Name: {course.name}</h4>
                      <h5>Description: {course.description}</h5>
                      <h6>Start: {formatDate(course.startDate)}</h6>
                      <h6>End: {formatDate(course.endDate)}</h6>
                    </div>
                    <div className='card-footer bg-transparent'>
                      <Link
                        to={ROUTES.TEACHER.COURSE_DETAILS.replace(
                          ':courseId',
                          course.id
                        )}
                        className='btn btn-outline-primary w-100'
                        aria-label={`View details for ${course.name}`}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </section>
  )
}

export default TeacherHome
