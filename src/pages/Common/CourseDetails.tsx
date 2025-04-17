// src/pages/CourseDetails.tsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import courseService from '../../services/coursesService'
import { ICourse } from '../../interfaces/components/ICourse'
import { IModule } from '../../interfaces/components/IModule'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import { useDeleteHandler } from '../../hooks/useDeleteHandler'
import { ResourceManager } from '../../Components/ResourceManager'
import { useNotification } from '../../context/NotificationContext'
import { moduleFields } from '../../Components/common/forms/moduleFields'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import moduleService from '../../services/moduleService'
import { useModuleManagement } from '../../hooks/useModuleManagement'
import useActivityManagement from '../../hooks/useActivitymanagement'
import { activityFields } from '../../Components/common/forms/activityFields'
import { IActivity } from '../../interfaces/components/IActivity'
import activityService from '../../services/activityService'
import { formatDate } from '../../utils/dateUtils'

const CourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState('')

  const {
    modules,
    setModules,
    currentModule,
    setCurrentModule,
    handleSubmitModule,
  } = useModuleManagement(courseId || '')

  const {
    activities,
    setActivities,
    currentActivity,
    setCurrentActivity,
    handleSubmitActivity,
  } = useActivityManagement(selectedModuleId)

  const { showNotification } = useNotification()

  const {
    deletingId: deletingModuleId,
    error: deleteModuleError,
    deleteItem: deleteModule,
  } = useDeleteHandler<IModule>(
    (moduleId: string) => moduleService.deleteModule(courseId!, moduleId),
    setModules,
    modules
  )

  const {
    deletingId: deletingActivityId,
    // error: deleteActivityError,
    deleteItem: deleteActivity,
  } = useDeleteHandler<IActivity>(
    (activityId: string) =>
      activityService.deleteActivity(selectedModuleId, activityId),
    setActivities,
    activities
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

  const handleFetchActivities = async (moduleId: string) => {
    setSelectedModuleId(moduleId)
    try {
      const response =
        await activityService.getAllActivities<IActivity[]>(moduleId)
      setActivities(response.data)
    } catch (err) {
      console.error('Failed to fetch activities', err)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!course) return <p>No course found.</p>

  return (
    <main className='container p-5 d-flex justify-content-center flex-column align-items-center '>
      <h2 className='p-4'>Course Details</h2>
      <section className=' border rounded p-2 w-100'>
        <section className='card p-4'>
          <h3>Title: {course.title}</h3>
          <h4>Name: {course.name}</h4>
          <h5>Description: {course.description}</h5>
          <h6>
            Start:
            {course.startDate ? course.startDate.toLocaleString() : 'N/A'}
          </h6>
          <h6>
            End: {course.endDate ? course.endDate.toLocaleString() : 'N/A'}
          </h6>
        </section>

        <section className='mb-3 border border-2 p-2 mt-2 rounded'>
          <h2>Modules</h2>
          {deleteModuleError && (
            <div className='alert alert-danger'>{deleteModuleError}</div>
          )}

          <ReusableButton
            onClick={() => {
              setCurrentModule(null)
              setIsModuleModalOpen(true)
            }}
            theme='dark'
            className='bg-success'
            label='Add Module'
          />
        </section>

        <div className='accordion' id='modulesAccordion'>
          {modules.length > 0 ? (
            modules.map((module, index) => (
              <div className='accordion-item' key={module.id}>
                <h2 className='accordion-header'>
                  <button
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#collapseModule${module.id}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={`collapseModule${module.id}`}
                    onClick={() => handleFetchActivities(module.id)}
                  >
                    <div className='p-3'>{module.activityType}</div>
                    {module.title}
                  </button>
                </h2>
                <div
                  id={`collapseModule${module.id}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent='#modulesAccordion'
                >
                  <div className='accordion-body'>
                    <strong>{module.title}</strong>
                    <h4>{module.name}</h4>
                    <p>{module.description}</p>

                    {/* Activities Section */}
                    <div className='mt-4'>
                      <h5>Activities</h5>
                      <ReusableButton
                        onClick={() => {
                          setSelectedModuleId(module.id)
                          setCurrentActivity(null)
                          setIsActivityModalOpen(true)
                        }}
                        theme='dark'
                        className='bg-success mb-3'
                        label='Add Activity'
                      />

                      {activities.length > 0 ? (
                        <div className='list-group'>
                          {activities.map((activity) => (
                            <div key={activity.id} className='list-group-item'>
                              <h6>{activity.title}</h6>
                              <p>{activity.description}</p>
                              <h4>{formatDate(activity.dueDate)}</h4>
                              {/* <h4>{formatDate(activity.endDate)}</h4> */}
                              <ReusableButton className='my-4'>
                                {/* TODO Let this code navigate to the assignment  */}
                                {activity.activityType}
                              </ReusableButton>
                              <div className='d-flex gap-2'>
                                <ReusableButton
                                  onClick={async () => {
                                    const deleted = await deleteActivity(
                                      activity.id,
                                      'Are you sure you want to delete this activity?'
                                    )
                                    if (deleted) {
                                      showNotification({
                                        message:
                                          'Activity deleted successfully!',
                                        variant: 'danger',
                                      })
                                    }
                                  }}
                                  theme='dark'
                                  className='bg-danger'
                                  disabled={deletingActivityId === activity.id}
                                  loading={deletingActivityId === activity.id}
                                >
                                  Delete Activity
                                </ReusableButton>

                                <ReusableButton
                                  onClick={() => {
                                    setSelectedModuleId(module.id)
                                    setCurrentActivity(activity)
                                    setIsActivityModalOpen(true)
                                  }}
                                  theme='dark'
                                  className='bg-info'
                                  label='Edit'
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No activities found for this module.</p>
                      )}
                    </div>

                    <div className='d-flex gap-2 mt-3'>
                      <ReusableButton
                        onClick={async () => {
                          const deleted = await deleteModule(
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
                        disabled={deletingModuleId === module.id}
                        loading={deletingModuleId === module.id}
                      >
                        Delete Module
                      </ReusableButton>

                      <ReusableButton
                        onClick={() => {
                          setCurrentModule(module)
                          setIsModuleModalOpen(true)
                        }}
                        theme='light'
                        className='bg-primary'
                        label='Edit Module'
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

        {/* Module Resource Manager */}
        <ResourceManager<IModule>
          fields={moduleFields}
          isOpen={isModuleModalOpen}
          onClose={() => setIsModuleModalOpen(false)}
          onSubmit={async (data) => {
            const success = await handleSubmitModule(data)
            if (success ?? null) setIsModuleModalOpen(false)
          }}
          initialData={currentModule || undefined}
          title={currentModule?.id ? 'Edit Module' : 'Create New Module'}
        />

        {/* Activity Resource Manager */}
        <ResourceManager<IActivity>
          fields={activityFields}
          isOpen={isActivityModalOpen}
          onClose={() => setIsActivityModalOpen(false)}
          onSubmit={async (data) => {
            await handleSubmitActivity(data)
            setIsActivityModalOpen(false)
            // Refresh activities after successful submission
            handleFetchActivities(selectedModuleId)
          }}
          initialData={currentActivity || undefined}
          title={currentActivity?.id ? 'Edit Activity' : 'Create New Activity'}
        />

        <GoBackButton />
      </section>
    </main>
  )
}

export default CourseDetails
