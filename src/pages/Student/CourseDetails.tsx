import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import courseService from '../../services/coursesService'
import moduleService from '../../services/moduleService'
import activityService from '../../services/activityService'

import { ICourse } from '../../interfaces/components/ICourse'
import { IModule } from '../../interfaces/components/IModule'
import { IActivity } from '../../interfaces/components/IActivity'

import GoBackButton from '../../Components/common/buttons/GoBackButton'
import { formatDate } from '../../utils/dateUtils'

const StudentCourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [modules, setModules] = useState<IModule[]>([])
  const [activities, setActivities] = useState<IActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [, setSelectedModuleId] = useState('')

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

      // Ensure we're setting arrays for modules and single object for course
      setCourse(courseResponse.data as ICourse)
      setModules(modulesResponse.data as unknown as IModule[])
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
      setActivities(response.data as unknown as IActivity[])
    } catch (err) {
      console.error('Failed to fetch activities', err)
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
        <section className='mb-3 border border-2 p-2 mt-2 rounded'>
          <h2>Modules</h2>
        </section>

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

                      {activities.length > 0 ? (
                        <div className='list-group'>
                          {activities.map((activity) => (
                            <div key={activity.id} className='list-group-item'>
                              <h6>Title: {activity.title}</h6>
                              <p>Description: {activity.description}</p>
                              <h3>Content: {activity.content}</h3>
                              <h4>
                                Start Date: {formatDate(activity.startDate)}
                              </h4>
                              <h4>End Date: {formatDate(activity.endDate)}</h4>

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

        <GoBackButton />
      </section>
    </main>
  )
}

export default StudentCourseDetails
