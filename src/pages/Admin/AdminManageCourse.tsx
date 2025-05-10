import { useEffect, useState } from 'react'
import { useCourseManagement, useDeleteHandler } from '../../hooks'

import { courseService } from '../../services'
import { courseFields } from '../../Components/common/forms/courseFields'
import { ResourceManager } from '../../Components/ResourceManager'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { ICourse } from '../../interfaces/components/entities'
import { useNotification } from '../../context/NotificationContext'
import { formatDate } from '../../utils/dateUtils'
import ResourceList from './ResourceList'

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
        <ResourceList
          items={courses}
          loading={loading}
          error={error || deleteError}
          emptyMessage='No courses available'
          keyExtractor={(course) => course.id}
          renderItem={(course) => (
            <>
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
            </>
          )}
        />

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
