import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCourseManagement } from '../../hooks/useCourseManagement'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import courseService from '../../services/coursesService'
import { courseFields } from '../../Components/common/forms/courseFields'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { ICourse } from '../../interfaces/components/ICourse'
import { useNotification } from '../../context/NotificationContext'

const Courses = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { courses, setCourses, currentCourse, setCurrentCourse, handleSubmit } =
    useCourseManagement()

  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<ICourse>(courseService.deleteCourse, setCourses, courses)

  const { showNotification } = useNotification()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const response = await courseService.getAllCourses()
        setCourses(
          Array.isArray(response.data)
            ? response.data.sort((a, b) => a.name.localeCompare(b.name))
            : []
        )
      } catch (err) {
        setError(`${err}: Failed to load courses`)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [setCourses])

  return (
    <div className='container'>
      <section className='card p-3'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h1>The Courses</h1>
          <ReusableButton
            onClick={() => {
              setCurrentCourse(null)
              setIsModalOpen(true)
            }}
            theme='light'
            label='Add Course'
          />
        </div>

        {loading && <p>Loading courses...</p>}
        {error && <div className='alert alert-danger'>{error}</div>}
        {deleteError && <div className='alert alert-danger'>{deleteError}</div>}

        {courses.length === 0 ? (
          <p className='text-danger fs-5 p-2'>There is no course available!</p>
        ) : (
          <ul className='list-group'>
            {courses.map((course) => (
              <li
                key={course.id}
                className='list-group-item border rounded m-2'
              >
                <div className='d-flex justify-content-between align-items-start'>
                  <Link
                    to={`/courses/${course.id}`}
                    className='flex-grow-1 text-decoration-none'
                  >
                    <section>
                      <h3>{course.name}</h3>
                      <h4 className='text-primary'>{course.title}</h4>
                      <p>{course.description}</p>
                    </section>
                  </Link>

                  <div className='d-flex flex-column gap-2 ms-3'>
                    <ReusableButton
                      onClick={() => {
                        setCurrentCourse(course)
                        setIsModalOpen(true)
                      }}
                      theme='light'
                      className='bg-primary text-white'
                      label='Edit'
                    />

                    <ReusableButton
                      onClick={async () => {
                        const deleted = await deleteItem(
                          course.id,
                          'Are you sure you want to delete this course?'
                        )
                        if (deleted) {
                          showNotification({
                            message: 'Course deleted successfully!',
                            variant: 'danger',
                          })
                        }
                      }}
                      theme='light'
                      className='bg-danger text-white'
                      disabled={deletingId === course.id}
                      loading={deletingId === course.id}
                    >
                      Delete Course
                    </ReusableButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <ResourceManager<ICourse>
          fields={courseFields}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            const success = await handleSubmit(data)
            if (success) setIsModalOpen(false)
          }}
          initialData={currentCourse || undefined}
          title={currentCourse ? 'Edit Course' : 'Create New Course'}
        />
      </section>
      <GoBackButton />
    </div>
  )
}

export default Courses
