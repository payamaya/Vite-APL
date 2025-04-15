import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import courseService from '../../api/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import ReusableModal from '../../Components/common/modals/ReusableModal'
import { ModalField } from '../../interfaces/components/common/ModalField'
import { ApiResponse } from '../../interfaces/components/ApiResponse'
import { useNotification } from '../../context/NotificationContext'

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null)

  const { showNotification } = useNotification()
  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<ICourse>(courseService.deleteCourse, setCourses, courses)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await courseService.getAllCourses()
      const fetchedCourses = Array.isArray(response.data) ? response.data : []

      // Optional: Alphabetical sort
      fetchedCourses.sort((a, b) => a.name.localeCompare(b.name))

      setCourses(fetchedCourses)
    } catch (err) {
      setError('Failed to load courses')
      console.error('Fetch courses error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (course: ICourse) => {
    setCurrentCourse(course)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setCurrentCourse(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (formData: ICourse) => {
    try {
      let response: ApiResponse<ICourse>

      if (currentCourse) {
        // Update
        const updateData = { ...currentCourse, ...formData }
        response = await courseService.updateCourse(
          currentCourse.id,
          updateData
        )

        if (response.status >= 200 && response.status < 300) {
          setCourses((prev) =>
            prev.map((course) =>
              course.id === currentCourse.id ? response.data : course
            )
          )
          showNotification({
            message: 'Course updated successfully!',
            variant: 'info',
          })
        } else {
          throw new Error(response.data?.message || 'Failed to update course')
        }
      } else {
        // Create
        response = await courseService.createCourse(formData)
        if (response.status >= 200 && response.status < 300) {
          setCourses((prev) => [response.data, ...prev])
          showNotification({
            message: 'Course created successfully!',
            variant: 'success',
          })
        } else {
          throw new Error(response.data?.message || 'Failed to create course')
        }
      }

      setIsModalOpen(false)
      setError(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      showNotification({ message: `Failed: ${msg}`, variant: 'danger' })
      console.error('Submit error:', err)
    }
  }

  const courseFields: ModalField<ICourse>[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    // Add more fields if needed
  ]

  return (
    <div className='container'>
      <section className='card p-3'>
        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h1>The Courses</h1>
          <ReusableButton
            onClick={handleCreate}
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
                      {course.img && (
                        <img
                          src={course.img}
                          alt={course.name}
                          className='figure-img img-fluid rounded'
                        />
                      )}
                    </section>
                  </Link>

                  <div className='d-flex flex-column gap-2 ms-3'>
                    <ReusableButton
                      onClick={() => handleEdit(course)}
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

        <GoBackButton />
      </section>

      <ReusableModal<ICourse>
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentCourse || undefined}
        title={currentCourse ? 'Edit Course' : 'Create New Course'}
        fields={courseFields}
      />
    </div>
  )
}

export default Courses
