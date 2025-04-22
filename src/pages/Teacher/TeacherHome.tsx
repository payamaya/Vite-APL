import { useEffect, useState } from 'react'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { Link } from 'react-router-dom'

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
    <main className='container ' aria-labelledby='teacher-dashboard-heading'>
      <article className='row'>
        <section
          className='col-12 w-full d-flex justify-content-center'
          aria-labelledby='dashboard-header'
        >
          <div className='card border-primary '>
            <header className='card-header bg-black text-white'>
              <h1
                id='dashboard-header'
                className='d-flex justify-content-center'
              >
                Teacher Dashboard
              </h1>
            </header>

            <div className='card-body'>
              <h5 className='h5 d-flex justify-content-center'>
                Welcome, Teacher! Here's your dashboard overview.
              </h5>
            </div>
          </div>
        </section>
      </article>

      <article
        className='row w-full d-flex justify-content-center my-2'
        aria-labelledby='courses-section'
      >
        <section className='col-12'>
          <div className='card shadow-sm'>
            <header className='card-header bg-warning text-white'>
              <h5 id='courses-section' className='h5'>
                My Courses
              </h5>
            </header>
            <div className='card-body'>
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

              {!loading && !error && courses.length === 0 ? (
                <div className='alert alert-info' role='status'>
                  You haven't created any courses yet.
                </div>
              ) : (
                <div className='row g-4' role='list'>
                  {courses.map((course) => (
                    <article
                      key={course.id}
                      className='col-md-6 col-lg-4'
                      role='listitem'
                      aria-labelledby={`course-${course.id}-title`}
                    >
                      <div className='card h-100 shadow-sm border-0 course-card'>
                        <div className='card-body d-flex flex-column'>
                          <h3
                            id={`course-${course.id}-title`}
                            className='h5 fw-bold text-dark mb-2'
                          >
                            {course.name}
                          </h3>
                          <h4 className='text-secondary mb-2 h6'>
                            {course.title}
                          </h4>
                          <p className='text-muted flex-grow-1 small'>
                            {course.description?.length > 120
                              ? `${course.description.slice(0, 120)}...`
                              : course.description}
                          </p>
                          <Link
                            to={`/courses/${course.id}`}
                            className='btn btn-sm btn-outline-primary mt-3 align-self-start'
                            aria-label={`View details for ${course.name}`}
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </article>
    </main>
  )
}

export default TeacherHome
