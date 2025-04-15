import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import courseService from '../../api/coursesService'
import moduleService from '../../api/moduleService'
import { ICourse } from '../../interfaces/components/ICourse'
// import ReusableForm from '../../Components/common/forms/ReusableForm'
import { IModule } from '../../interfaces/components/IModule'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import ReusableModal from '../../Components/common/modals/ReusableModal'

import { ModalField } from '../../interfaces/components/common/ModalField'
import { useNotification } from '../../context/NotificationContext'

const CourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [modules, setModules] = useState<IModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModule, setCurrentModule] = useState<IModule | null>(null)
  const { showNotification } = useNotification()
  const {
    deletingId,
    error: deleteError,
    deleteItem,
  } = useDeleteHandler<IModule>(
    (moduleId: string) => moduleService.deleteModule(courseId!, moduleId),
    setModules,
    modules
  )

  const fetchCourseAndModules = async () => {
    try {
      if (!courseId) {
        setError('No course ID provided')
        return
      }

      setLoading(true)
      setError('')

      const courseResponse =
        await courseService.getCourseById<ICourse>(courseId)
      setCourse(courseResponse.data)

      const modulesResponse =
        await moduleService.getAllModules<IModule[]>(courseId)
      setModules(modulesResponse.data)
    } catch (err) {
      setError('Failed to load course or modules')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  const handleEdit = (module: IModule) => {
    setCurrentModule(module)
    setIsModalOpen(true)
  }
  useEffect(() => {
    fetchCourseAndModules()
  }, [courseId])

  const moduleFields: ModalField<IModule>[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    // { name: 'img', label: 'Image URL', type: 'url' },
    // { name: 'startDate', label: 'Start Date', type: 'date' },
    // { name: 'endDate', label: 'End Date', type: 'date' },
  ]

  const handleSubmitModule = async (formData: IModule) => {
    try {
      if (!courseId) {
        throw new Error('Course ID is missing')
      }

      if (currentModule) {
        // Update existing module
        const updateData = {
          ...currentModule,
          ...formData,
          id: currentModule.id,
        }

        const response = await moduleService.updateModule(
          courseId,
          currentModule.id,
          updateData
        )

        if (response.status >= 200 && response.status < 300) {
          // Update the module in local state
          setModules((prevModules) =>
            prevModules.map((module) =>
              module.id === currentModule.id ? response.data : module
            )
          )
          showNotification({
            message: 'Module updated successfully!',
            variant: 'info',
          })
          setIsModalOpen(false)
          setCurrentModule(null)
        } else {
          throw new Error(`${response.data || ':Update failed'} `)
        }
      } else {
        // Create new module
        const response = await moduleService.createModule(courseId, formData)

        if (response.status >= 200 && response.status < 300) {
          // Add new module to the list
          setModules((prevModules) => [response.data, ...prevModules])
          showNotification({
            message: 'Module created successfully!',
            variant: 'success',
          })
          setIsModalOpen(false)
        } else {
          throw new Error(`${response.data || 'Creation failed'} `)
        }
      }
    } catch (err: unknown) {
      let errorMessage = 'Unknown error'
      if (err instanceof Error) {
        errorMessage = err.message
        showNotification({
          message: `Failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
          variant: 'danger',
        })
      }
      console.error('Error details:', errorMessage)
      setError(`Failed to save module: ${errorMessage}`)
    }
  }
  const handleCreateModule = () => {
    setCurrentModule(null) // Set to null for creation
    setIsModalOpen(true)
  }
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!course) return <p>No course found.</p>

  return (
    <section className='container border rounded p-2 mt-5'>
      <h2 className='mt-5'>Course Details</h2>
      <h3>Title: {course.title}</h3>
      <h6>Name: {course.name}</h6>
      <p>Description: {course.description}</p>
      <p>Start: {course.startDate}</p>
      <p>End: {course.endDate}</p>

      <h2>Modules</h2>
      {deleteError && <div className='alert alert-danger'>{deleteError}</div>}
      <div className='mb-3'>
        <ReusableButton
          onClick={handleCreateModule}
          theme='dark'
          className='bg-success'
          label='Add Module'
        />
      </div>

      <div className='accordion' id='accordionExample'>
        {modules.length > 0 ? (
          modules.map((module, index) => (
            <div className='accordion-item' key={module.id}>
              <h2 className='accordion-header'>
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#collapse${module.id}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${module.id}`}
                >
                  <div className='p-3'>{module.activityType}</div>
                  {module.title}
                </button>
              </h2>
              <div
                id={`collapse${module.id}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                data-bs-parent='#accordionExample'
              >
                <div className='accordion-body'>
                  <strong>{module.title}</strong>
                  <h4>{module.name}</h4>
                  <p>{module.description}</p>
                  <div className='btn btn-info'>
                    Need to add the activity type her{module.activityType}
                  </div>
                  <div className='d-flex gap-2'>
                    <ReusableButton
                      onClick={async () => {
                        await deleteItem(
                          module.id,
                          'Are you sure you want to delete this module?'
                        )
                        showNotification({
                          message: 'Module deleted successfully!',
                          variant: 'danger',
                        })
                      }}
                      theme='light'
                      className='bg-danger'
                      disabled={deletingId === module.id}
                      loading={deletingId === module.id}
                    >
                      Delete Module
                    </ReusableButton>

                    <ReusableButton
                      onClick={() => handleEdit(module)}
                      theme='light'
                      className='bg-primary'
                      label='Edit'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No modules found for this course.</p>
        )}
      </div>
      <ReusableModal<IModule>
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setCurrentModule(null)
        }}
        onSubmit={handleSubmitModule}
        initialData={currentModule || undefined}
        title={currentModule ? 'Edit Module' : 'Create New Module'}
        fields={moduleFields}
      />
    </section>
  )
}

export default CourseDetails
