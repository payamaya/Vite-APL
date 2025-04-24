import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { useCourseManagement } from '../../hooks/useCourseManagement'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import courseService from '../../services/coursesService'
import { courseFields } from '../../Components/common/forms/courseFields'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { ICourse } from '../../interfaces/components/ICourse'
import { useNotification } from '../../context/NotificationContext'
import { formatDate } from '../../utils/dateUtils'

const AdminManageCourse = () => {
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
    <>
      <div className='d-flex justify-content-evenly align-items-center mb-3'>
        <GoBackButton />
        <ReusableButton
          onClick={() => {
            setCurrentCourse(null)
            setIsModalOpen(true)
          }}
          theme='light'
          label='Add Course'
        />
      </div>
      <section className='border border-2 border-primary rounded'>
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
        {deleteError && <div className='alert alert-danger'>{deleteError}</div>}

        {courses.length === 0 ? (
          <p className='text-danger fs-5 p-2'>There is no course available!</p>
        ) : (
          <ul className='list-group d-flex flex-wrap direction-raw'>
            {courses.map((course) => (
              <li
                key={course.id}
                className='list-group-item border rounded m-2'
                role='listitem'
                aria-labelledby={`course-${course.id}-title`}
              >
                <section className='p-4 my-4 border rounded-4 shadow-sm bg-light'>
                  <div className='mb-4'>
                    <h3 className='fw-bold text-dark mb-1'>{course.name}</h3>
                    <h4 className='text-primary mb-2'>{course.title}</h4>
                    <p className='text-secondary mb-0'>{course.description}</p>
                  </div>

                  <div className='row g-3'>
                    <div className='col-md-6'>
                      <div className='bg-white border rounded-4 p-3 shadow-sm h-100'>
                        <div className='mb-1 text-muted text-uppercase small'>
                          Start Date
                        </div>
                        <div className='fw-semibold text-dark'>
                          {formatDate(course.startDate)}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='bg-white border rounded-4 p-3 shadow-sm h-100'>
                        <div className='mb-1 text-muted text-uppercase small'>
                          End Date
                        </div>
                        <div className='fw-semibold text-dark'>
                          {formatDate(course.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className='d-flex justify-content-evenly gap-2 ms-3'>
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
                    className='bg-danger text-white w-50'
                    disabled={deletingId === course.id}
                    loading={deletingId === course.id}
                    label=' Delete Course'
                  />
                  <ReusableButton
                    onClick={() => {
                      setCurrentCourse(course)
                      setIsModalOpen(true)
                    }}
                    theme='light'
                    className='bg-primary text-white w-50'
                    label='Edit'
                  />
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
    </>
  )
}

export default AdminManageCourse
