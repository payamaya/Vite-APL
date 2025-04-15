import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import courseService from '../../api/coursesService'
import moduleService from '../../api/moduleService'
import { ICourse } from '../../interfaces/components/ICourse'
import ReusableForm from '../../Components/common/forms/ReusableForm'
import { IModule } from '../../interfaces/components/IModule'

const CourseDetails = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<ICourse | null>(null)
  const [modules, setModules] = useState<IModule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Properly implement the fetch function
  const fetchCourseAndModules = async () => {
    try {
      if (!courseId) {
        setError('No course ID provided')
        return
      }

      setLoading(true)
      setError('')

      // Fetch course details
      const courseResponse =
        await courseService.getCourseById<ICourse>(courseId)
      setCourse(courseResponse.data)

      // Fetch modules - adjust based on your actual API response structure
      const modulesResponse =
        await moduleService.getAllModules<IModule[]>(courseId)

      // Handle different response structures:
      // If response is ApiResponse<IModule[]>
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

  return (
    <section className='container border rounded p-2 mt-5'>
      <h2 className='mt-5'>Course Details</h2>
      <h3>Title: {course.title}</h3>
      <h6>Name: {course.name}</h6>
      <p>Description: {course.description}</p>
      <p>Start: {course.startDate}</p>
      <p>End: {course.endDate}</p>

      <h2>Modules</h2>
      <ReusableForm
        endpoint={`/course/${courseId}/module`}
        onSuccess={fetchCourseAndModules}
        initialData={{
          name: '',
          title: '',
          description: '',
          courseId: courseId, // Now matches IFormData
        }}
      />

      {/* Bootstrap Accordion for Modules */}
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No modules found for this course.</p>
        )}
      </div>
    </section>
  )
}

export default CourseDetails
