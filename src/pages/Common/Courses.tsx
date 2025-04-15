import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import courseService from '../../api/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableForm from '../../Components/common/forms/ReusableForm'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { useDeleteHandler } from '../../hooks/useDeleteHandler' // <-- Updated import

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Use custom delete hook
  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<ICourse>(courseService.deleteCourse, setCourses, courses)

  // Fetch courses from backend when component mounts
  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await courseService.getAllCourses()
      setCourses(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError('Failed to load courses')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <section className='card'>
        <h1>The Courses</h1>

        {/* Show loading state */}
        {loading && <p>Loading courses...</p>}

        {/* Show general fetch error */}
        {error && <div className='alert alert-danger'>{error}</div>}

        {/* Show delete error */}
        {deleteError && <div className='alert alert-danger'>{deleteError}</div>}


        {/* Show courses or a message if there are none */}
        {courses.length === 0 ? (
          <p className='text-danger fs-5 p-2'>There is no course available!</p>
        ) : (
          <ul className='list-group'>
            {courses.map((course: ICourse) => (
              <li
                key={course.id}
                className='list-group-item border rounded m-2'
              >
                <div className='d-flex justify-content-between align-items-start'>
                  <Link
                    to={`/courses/${course.id}`}
                    className='flex-grow-1 text-decoration-none'
  
          {/* Show courses or a message if there are none */}
     {courses.length === 0 ? <p className='text-danger fs-5 p-2'>There are no courses available!</p> : <ul className='list-group'>
          {courses.map((course: ICourse) => (
            <li key={course.id} className='list-group-item border rounded m-2'>
              <div className='d-flex justify-content-between align-items-start'>
                <Link
                  to={`/courses/${course.id}`}
                  className='flex-grow-1 text-decoration-none'
                >
                  <section>
                    <h3>{course.name}</h3>
                    <h4 className='br-primary'>{course.title}</h4>
                    <p>{course.description}</p>
                    {course.img && (
                      <img
                        src={course.img}
                        alt={course.name}
                        className='figure-img img-fluid rounded'
                      />
                    )}
                  </section>
                </Link>
                <div className='d-flex gap-2'>
                  <ReusableButton
                    onClick={() =>
                      deleteItem(
                        course.id,
                        'Are you sure you want to delete this course?'
                      )
                    }
                    theme='light'
                    className='bg-danger'
                    disabled={deletingId === course.id}
                    loading={deletingId === course.id}
                  >
                    <section>
                      <h3>{course.name}</h3>
                      <h4 className='br-primary'>{course.title}</h4>
                      <p>{course.description}</p>
                      {course.img && (
                        <img
                          src={course.img}
                          alt={course.name}
                          className='figure-img img-fluid rounded'
                        />
                      )}
                    </section>
                  </Link>
                  <div className='d-flex gap-2'>
                    <ReusableButton
                      onClick={() =>
                        deleteItem(
                          course.id,
                          'Are you sure you want to delete this course?'
                        )
                      }
                      theme='light'
                      className='bg-danger'
                      disabled={deletingId === course.id}
                      loading={deletingId === course.id}
                    >
                      Delete
                    </ReusableButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <GoBackButton />
      </section>

      <ReusableForm endpoint={'/course'} onSuccess={fetchCourses} />
    </div>
  )
}

export default Courses
