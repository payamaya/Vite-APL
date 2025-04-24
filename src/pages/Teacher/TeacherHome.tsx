import { useEffect, useState } from 'react'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routePaths'

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
    <main className='main d-flex flex-column align-items-center'>
      <article
        className='border border-2 p-2 border-primary rounded shadow-sm mb-2 '
        style={{ maxWidth: '1200px' }}
      >
        <header className='card-header bg-black text-white'>
          <h1 id='dashboard-header' className='d-flex justify-content-center'>
            Teacher Dashboard
          </h1>
        </header>

        <div className='card-body'>
          <h5 className='h5 d-flex justify-content-center'>
            Welcome, Teacher! Here's your dashboard overview.
          </h5>
        </div>
      </article>

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
                      <h3 className='card-title fw-bold'>{course.name}</h3>
                      <h4 className='card-subtitle text-primary mb-2'>
                        {course.title}
                      </h4>
                      <p className='card-text'>
                        {course.description?.length > 120
                          ? `${course.description.slice(0, 120)}...`
                          : course.description}
                      </p>
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
    </main>
  )
}

export default TeacherHome
