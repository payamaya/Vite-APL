import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { activityService, courseService, moduleService } from '../../services'

import {
  ICourse,
  IModule,
  IActivity,
} from '../../interfaces/components/entities'

import GoBackButton from '../../Components/common/buttons/GoBackButton'
import { formatDate } from '../../utils/dateUtils'

const StudentCourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [modules, setModules] = useState<IModule[]>([])
  const [activities, setActivities] = useState<IActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)

  const fetchCourseAndModules = async () => {
    if (!courseId) {
      setError('No course ID provided')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')

      // Fetch course and modules in parallel
      const [courseResponse, modulesResponse] = await Promise.all([
        courseService.getCourseById(courseId),
        moduleService.getAllModules(courseId),
      ])

      // Ensure we're setting arrays for modules and single object for course
      setCourse(courseResponse.data)
      const modulesData = modulesResponse.data
      setModules(Array.isArray(modulesData) ? modulesData : [modulesData])
    } catch (err) {
      setError('Failed to load course or modules')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFetchActivities = async (moduleId: string) => {
    try {
      setSelectedModuleId(moduleId)
      const response = await activityService.getAllActivities(moduleId)

      // Ensure we always set an array of activities
      const activitiesData = response.data
      setActivities(
        Array.isArray(activitiesData) ? activitiesData : [activitiesData]
      )
    } catch (err) {
      console.error('Failed to fetch activities:', err)
      setActivities([])
    }
  }

  useEffect(() => {
    fetchCourseAndModules()
  }, [courseId])

  if (loading) return <div className='text-center mt-4'>Loading...</div>
  if (error) return <div className='alert alert-danger mt-4'>{error}</div>
  if (!course)
    return <div className='alert alert-info mt-4'>No course found.</div>

  return (
    <main className='mt-4 container p-5 d-flex justify-content-center flex-column align-items-center'>
      <h2 className='p-4'>Student Course Details</h2>

      <section className='border rounded p-2 w-100'>
        {/* Course Info Section */}
        <section className='mb-3 border border-2 p-2 mt-2 rounded'>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          {course.startDate && (
            <p>
              <strong>Start:</strong> {formatDate(course.startDate)}
            </p>
          )}
          {course.endDate && (
            <p>
              <strong>End:</strong> {formatDate(course.endDate)}
            </p>
          )}
        </section>

        {/* Modules Section */}
        <section className='mb-3 border border-2 p-2 mt-2 rounded'>
          <h2>Modules</h2>
          <div className='accordion' id='modulesAccordion'>
            {modules.length > 0 ? (
              modules.map((module) => (
                <div className='accordion-item' key={module.id}>
                  <h2 className='accordion-header'>
                    <button
                      className='accordion-button collapsed'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target={`#collapseModule${module.id}`}
                      aria-expanded='false'
                      aria-controls={`collapseModule${module.id}`}
                      onClick={() => handleFetchActivities(module.id)}
                    >
                      <div className='p-3'>{module.activityType}</div>
                      {module.title}
                    </button>
                  </h2>
                  <div
                    id={`collapseModule${module.id}`}
                    className='accordion-collapse collapse'
                    data-bs-parent='#modulesAccordion'
                  >
                    <div className='accordion-body'>
                      <strong>{module.title}</strong>
                      <h4>{module.name}</h4>
                      <p>{module.description}</p>

                      {/* Activities Section */}
                      <div className='mt-4'>
                        <h5>Activities</h5>
                        {selectedModuleId === module.id ? (
                          activities.length > 0 ? (
                            <div className='list-group'>
                              {activities.map((activity) => (
                                <div
                                  key={activity.id}
                                  className='list-group-item'
                                >
                                  <h6>Title: {activity.title}</h6>
                                  <p>Description: {activity.description}</p>
                                  <h3>Content: {activity.content}</h3>
                                  <h4>
                                    Start Date: {formatDate(activity.startDate)}
                                  </h4>
                                  <h4>
                                    End Date: {formatDate(activity.endDate)}
                                  </h4>
                                  <div className='d-flex gap-2'>
                                    <button className='btn btn-primary'>
                                      {activity.activityType}
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p>No activities found for this module.</p>
                          )
                        ) : (
                          <p>Click to load activities...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No modules found for this course.</p>
            )}
          </div>
        </section>

        <GoBackButton />
      </section>
    </main>
  )
}

export default StudentCourseDetails
