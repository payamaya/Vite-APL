import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { IModule } from '../../interfaces/components/IModule'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import { ResourceManager } from '../../Components/ResourceManager'
import { useNotification } from '../../context/NotificationContext'
// import { useCourseManagement } from '../../hooks/useCourseManagement'
import { moduleFields } from '../../Components/common/forms/moduleFields'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import moduleService from '../../services/moduleService'
import { useModuleManagement } from '../../hooks/useModuleManagement'

const CourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  // In CourseDetails component
  const { modules, setModules, currentModule, setCurrentModule, handleSubmit } =
    useModuleManagement(courseId || '')

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

      const [courseResponse, modulesResponse] = await Promise.all([
        courseService.getCourseById<ICourse>(courseId),
        moduleService.getAllModules<IModule[]>(courseId),
      ])

      setCourse(courseResponse.data)
      setModules(modulesResponse.data)
    } catch (err) {
      setError('Failed to load course or modules')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourseAndModules()
  }, [courseId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!course) return <p>No course found.</p>
  const getFormattedDate = (date: Date = new Date()) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }
  return (
    <main className='container p-5 d-flex justify-content-center flex-column align-items-center '>
      <h2 className='p-4'>Course Details</h2>
      <section className=' border rounded p-2 w-100'>
        <section className='card p-4'>
          <h3>Title: {course.title}</h3>
          <h4>Name: {course.name}</h4>
          <h5>Description: {course.description}</h5>
          <h6>
            Start: {course.startDate} {` ${getFormattedDate()}`}
          </h6>
          <h6>
            End: {course.endDate} {` ${getFormattedDate()}`}
          </h6>
        </section>

        <section className='mb-3  border border-2 p-2 mt-2 rounded'>
          <h2>Modules</h2>
          {deleteError && (
            <div className='alert alert-danger'>{deleteError}</div>
          )}

          <ReusableButton
            onClick={() => {
              setCurrentModule(null)
              setIsModalOpen(true)
            }}
            theme='dark'
            className='bg-success'
            label='Add Module'
          />
        </section>

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
                    <div className='d-flex gap-2'>
                      <ReusableButton
                        onClick={async () => {
                          const deleted = await deleteItem(
                            module.id,
                            'Are you sure you want to delete this module?'
                          )
                          if (deleted) {
                            showNotification({
                              message: 'Module deleted successfully!',
                              variant: 'danger',
                            })
                          }
                        }}
                        theme='light'
                        className='bg-danger'
                        disabled={deletingId === module.id}
                        loading={deletingId === module.id}
                      >
                        Delete Module
                      </ReusableButton>

                      <ReusableButton
                        onClick={() => {
                          setCurrentModule(module)
                          setIsModalOpen(true)
                        }}
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

        <ResourceManager<IModule>
          fields={moduleFields}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            const success = await handleSubmit(data)
            if (success) setIsModalOpen(false)
          }}
          initialData={currentModule || undefined}
          title={currentModule?.id ? 'Edit Module' : 'Create New Module'}
        />

        <GoBackButton />
      </section>
    </main>
  )
}

export default CourseDetails
