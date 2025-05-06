import { useEffect, useState } from 'react'
import { courseService } from '../../services'
import { ICourse } from '../../interfaces/components/entities'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routePaths'
import { formatDate } from '../../utils/dateUtils'

const StudentHome = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [courses, setCourses] = useState<ICourse[]>([])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await courseService.getAllCourses()

      if (Array.isArray(response.data)) {
        setCourses(response.data)
      } else {
        setError('Invalid response data while loading courses.')
        setCourses([])
      }
    } catch (err) {
      setError(`${err}: Failed to load courses`)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <section
      className='row border border-2 border-primary rounded p-2'
      aria-labelledby='courses-section'
    >
      <header className='card-header bg-primary text-white'>
        <h1 id='dashboard-header' className='d-flex justify-content-center'>
          Student Dashboard
        </h1>
      </header>

      <div className='card-body'>
        <h5 className='h5 d-flex justify-content-center'>
          Welcome, Student! Here's your dashboard overview.
        </h5>
      </div>

      <section className='border border-2 border-primary rounded w-100 p-2'>
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
        {!loading && courses.length === 0 && (
          <div className='alert alert-info' role='status'>
            No courses available.
          </div>
        )}
        {!loading && courses.length > 0 && (
          <div
            className='row row-cols-1 row-cols-md-2 row-cols-lg-3 p-0 m-0 d-flex align-items-center justify-content-evenly'
            role='list'
          >
            {courses.map((course) => (
              <article
                key={course.id}
                className='col list-group-item w-50 m-2'
                role='listitem'
                aria-labelledby={`course-${course.id}-title`}
              >
                <Link
                  to={ROUTES.STUDENT.COURSE_DETAILS.replace(
                    ':courseId',
                    course.id
                  )}
                  // className='btn btn-sm btn-outline-primary mt-3 align-self-start'
                  aria-label={`View details for ${course.name}`}
                >
                  <div className='card h-100 shadow-sm '>
                    <div className='card-body d-flex flex-column'>
                      <div className='card-body'>
                        <h3>Title: {course.title}</h3>
                        <h4>Name: {course.name}</h4>
                        <h5>Description: {course.description}</h5>
                        <h6>Start: {formatDate(course.startDate)}</h6>
                        <h6>End: {formatDate(course.endDate)}</h6>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  )
}

export default StudentHome
