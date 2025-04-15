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

const Courses = () => {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null)

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

      // Sort alphabetically by course name, or however you want
      fetchedCourses.sort((a, b) => a.name.localeCompare(b.name))

      setCourses(fetchedCourses)
    } catch (err) {
      setError('Failed to load courses')
      console.error(err)
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
        // Update existing course
        const updateData = {
          ...currentCourse,
          ...formData,
          id: currentCourse.id,
        }

        response = await courseService.updateCourse(
          currentCourse.id,
          updateData
        )

        if (response.status >= 200 && response.status < 300) {
          // Update the course in local state while maintaining exact references
          // Add this inside your update success block
          console.log(
            'Before update:',
            courses.findIndex((c) => c.id === currentCourse.id)
          )
          setCourses((prevCourses) => {
            const index = prevCourses.findIndex(
              (c) => c.id === currentCourse.id
            )
            const newCourses = [...prevCourses]
            newCourses[index] = response.data
            return newCourses
          })

          setIsModalOpen(false)
          setError(null)
        } else {
          throw new Error(`${response.data?.message} || 'Request failed'`)
        }
      } else {
        // Create new course - unchanged
        response = await courseService.createCourse(formData)

        if (response.status >= 200 && response.status < 300) {
          setCourses((prevCourses) => [response.data, ...prevCourses])
          setIsModalOpen(false)
          setError(null)
        } else {
          throw new Error(response.data?.message || 'Request failed')
        }
      }
    } catch (err: unknown) {
      console.error(`${err}: error while creating course`)
      // ... (keep existing error handling)
    }
  }
  const courseFields: ModalField<ICourse>[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    // { name: 'img', label: 'Image URL', type: 'url' },
    // { name: 'startDate', label: 'Start Date', type: 'date' },
    // { name: 'endDate', label: 'End Date', type: 'date' },
  ]

  return (
    <div className='container'>
      <section className='card'>
        <div className='d-flex justify-content-between align-items-center'>
          <h1>The Courses</h1>
        </div>

        {loading && <p>Loading courses...</p>}
        {error && <div className='alert alert-danger'>{error}</div>}
        {deleteError && <div className='alert alert-danger'>{deleteError}</div>}
        <div className='m-3'>
          <ReusableButton
            onClick={handleCreate}
            theme='light'
            label='Add Course'
          />
        </div>
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
                      onClick={() => handleEdit(course)}
                      theme='light'
                      className='bg-primary'
                      label='Edit'
                    />

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
                      label='Delete'
                    />
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
