import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { courseService, moduleService } from '../../services'

import { ICourse } from '../../interfaces/components/entities/ICourse'
import { IModule } from '../../interfaces/components/entities/IModule'
import ReusableButton from '../../Components/common/buttons/ReusableButton'

const ModuleDetails = () => {
  const { courseId, moduleId } = useParams<{
    courseId: string
    moduleId: string
  }>() // Get both courseId and moduleId
  const [course, setCourse] = useState<ICourse | null>(null)
  const [module, setModule] = useState<IModule | null>(null) // Store a single module's details
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      if (!courseId || !moduleId) {
        setError('No course ID or module ID provided')
        return
      }

      // Fetch the course details
      const courseResponse = await courseService.getCourseById(courseId)
      setCourse(courseResponse.data)

      // Fetch the specific module details using moduleId
      const moduleResponse = await moduleService.getModuleById(
        courseId,
        moduleId
      )
      setModule(moduleResponse.data)
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [courseId, moduleId])

  if (loading) return <div className='text-center mt-4'>Loading...</div>
  if (error) return <div className='alert alert-danger mt-4'>{error}</div>
  if (!course)
    return <div className='alert alert-warning mt-4'>No course found</div>
  if (!module)
    return <div className='alert alert-warning mt-4'>No module found</div>

  return (
    <section className='container mt-4'>
      {/* Course Information */}
      <div className='card'>
        <div className='card-header'>
          <h2>{course.title}</h2>
          <p className='text-muted'>{course.name}</p>
        </div>
        <div className='card-body'>
          <p>{course.description}</p>
          {course.startDate && (
            <p>
              <strong>Start:</strong> {course.startDate.toLocaleString()}
            </p>
          )}
          {course.endDate && (
            <p>
              <strong>End:</strong> {course.endDate.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Module Details */}
      <div className='card mt-4'>
        <div className='card-header'>
          <h3>Module Details</h3>
        </div>
        <div className='card-body'>
          <h5>{module.name}</h5>
          <p>
            <strong>Title:</strong> {module.title}
          </p>
          <p>
            <strong>Activity Type:</strong> {module.moduleType}
          </p>
          <p>
            <strong>Description:</strong> {module.description}
          </p>

          {/* Display other module-related information */}
          {module.activityDetails && (
            <div className='mt-3'>
              <strong>Activity Details:</strong>
              <p>{module.activityDetails}</p>
            </div>
          )}

          <div className='mt-3'>
            <ReusableButton className='btn btn-primary ' theme='light'>
              Edit Module {/* Add edit functionality if needed */}
            </ReusableButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ModuleDetails
