import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { courseService, moduleService, activityService } from '../../services'

import {
  ICourse,
  IModule,
  IActivity,
} from '../../interfaces/components/entities'

import ReusableButton from '../../Components/common/buttons/ReusableButton'
import GoBackButton from '../../Components/common/buttons/GoBackButton'
import { ResourceManager } from '../../Components/ResourceManager'

import { useNotification } from '../../context/NotificationContext'

import { moduleFields } from '../../Components/common/forms/moduleFields'
import { activityFields } from '../../Components/common/forms/activityFields'

import { formatDate } from '../../utils/dateUtils'

import { useDeleteHandler, useModuleManagement } from '../../hooks'
import { useActivityManagement } from '../../hooks/useActivityManagement'

const CourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false)
  const [selectedModuleId, setSelectedModuleId] = useState('')

  const { showNotification } = useNotification()

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

  const {
    deletingId: deletingModuleId,
    error: deleteModuleError,
    deleteItem: deleteModule,
  } = useDeleteHandler<IModule>(
    (moduleId: string) => moduleService.deleteModule(courseId!, moduleId),
    setModules,
    modules
  )

  const { deletingId: deletingActivityId, deleteItem: deleteActivity } =
    useDeleteHandler<IActivity>(
      (activityId: string) =>
        activityService.deleteActivity(selectedModuleId, activityId),
      setActivities,
      activities
    )

  const fetchCourseAndModules = async () => {
    if (!courseId) {
      setError('No course ID provided')
      return
    }

    try {
      setLoading(true)
      setError('')

      const [courseResponse, modulesResponse] = await Promise.all([
        courseService.getCourseById(courseId),
        moduleService.getAllModules(courseId),
      ])

      setCourse(courseResponse.data)
      setModules(
        Array.isArray(modulesResponse.data)
          ? modulesResponse.data
          : [modulesResponse.data]
      )
    } catch (err) {
      setError('Failed to load course or modules')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFetchActivities = async (moduleId: string) => {
    setSelectedModuleId(moduleId)
    try {
      const response = await activityService.getAllActivities(moduleId)
      setActivities(
        Array.isArray(response.data) ? response.data : [response.data]
      )
    } catch (err) {
      console.error('Failed to fetch activities', err)
    }
  }

  useEffect(() => {
    fetchCourseAndModules()
  }, [courseId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!course) return <p>No course found.</p>

  return (
    <main className='container p-5 d-flex justify-content-center flex-column align-items-center'>
      <h2 className='p-4'>Course Details</h2>

      <section className='border rounded p-2 w-100'>
        <section className='card p-4'>
          <h3>Title: {course.title}</h3>
          <h4>Name: {course.name}</h4>
          <h5>Description: {course.description}</h5>
          <h6>Start: {formatDate(course.startDate)}</h6>
          <h6>End: {formatDate(course.endDate)}</h6>
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
            modules.map((module) => (
              // modules.map((module, index) => (
              <div className='accordion-item' key={module.id}>
                <h2 className='accordion-header'>
                  <button
                    className={`accordion-button collapsed `}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target={`#collapseModule${module.id}`}
                    aria-expanded={'false'}
                    aria-controls={`collapseModule${module.id}`}
                    onClick={() => handleFetchActivities(module.id)}
                  >
                    <div className='p-3'>{module.activityType}</div>
                    {module.title}
                  </button>
                </h2>
                <div
                  id={`collapseModule${module.id}`}
                  className={`accordion-collapse collapse `}
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
                          {activities.map((activity: IActivity) => (
                            <div key={activity.id} className='list-group-item'>
                              <h6>Title: {activity.title}</h6>
                              <p>Description: {activity.description}</p>
                              <h3>Content: {activity.content}</h3>
                              <h4>
                                Start Date: {formatDate(activity.startDate)}
                              </h4>
                              <h4>End Date: {formatDate(activity.endDate)}</h4>

                              <ReusableButton className='my-4'>
                                {/* TODO: Navigate to the assignment view */}
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
        {/* Module Modal */}
        <ResourceManager<IModule>
          fields={moduleFields}
          isOpen={isModuleModalOpen}
          onClose={() => {
            setIsModuleModalOpen(false)
            setCurrentModule(null)
          }}
          onSubmit={async (data) => {
            const success = await handleSubmitModule(data)
            if (success) setIsModuleModalOpen(false)
          }}
          initialData={currentModule || undefined}
          title={currentModule?.id ? 'Edit Module' : 'Create New Module'}
        />
        {/* Activity Modal */}

        <ResourceManager<IActivity>
          fields={activityFields}
          isOpen={isActivityModalOpen}
          onClose={() => {
            setIsActivityModalOpen(false)
            setCurrentActivity(null)
          }}
          onSubmit={async (data) => {
            // Ensure moduleId is included in the submitted data
            const activityData = {
              ...data,
              moduleId: selectedModuleId,
            }

            const success = await handleSubmitActivity(activityData)
            if (success) {
              setIsActivityModalOpen(false)
              // Refresh the activities list
              handleFetchActivities(selectedModuleId)
            }
          }}
          initialData={currentActivity || undefined}
          title={currentActivity?.id ? 'Edit Activity' : 'Create New Activity'}
          key={`activity-modal-${selectedModuleId}-${currentActivity?.id || 'new'}`}
        />
        <GoBackButton />
      </section>
    </main>
  )
}

export default CourseDetails
