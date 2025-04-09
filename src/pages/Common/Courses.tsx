import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import courseService from '../../api/coursesApi' // Import API call function
import { ICourse } from '../../interfaces/components/ICourse'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch courses from backend when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseService.getAllCourses()
        console.log('API response:', data) // Call API function
        setCourses(Array.isArray(data) ? data : []) // Update state with API response
      } catch (err) {
        setError('Failed to load courses')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <section className='card'>
      <h1>The Courses</h1>

      {/* Show loading state */}
      {loading && <p>Loading courses...</p>}

      {/* Show error if API request fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {courses.map((course: ICourse) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <section>
                <h3>{course.name}</h3>
                <p>{course.des}</p>
                {course.img && (
                  <img
                    src={course.img}
                    alt={course.name}
                    className='figure-img img-fluid rounded'
                  />
                )}
              </section>
            </Link>
          </li>
        ))}
      </ul>
      <GoBackButton />
    </section>
  )
}

export default Courses
