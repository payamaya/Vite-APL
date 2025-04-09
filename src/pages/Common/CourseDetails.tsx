import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import courseService from '../../api/coursesApi'
import { ICourse } from '../../interfaces/components/ICourse'

const CourseDetails = () => {
  const { courseId } = useParams() // ✅ make sure this matches your route
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const modules = [
    {
      moduleID: '101',
      Activity: 'Module 1',
      ActivityTitle: 'Design',
      ActivityType: 'Quiz',
      ActvityDetails:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis suscipit sequi eos doloremque. Voluptas reprehenderit fuga aliquam quo qui. Nam dolores earum ea odit quod iusto soluta enim voluptas excepturi!',
    },
    {
      moduleID: '102',
      ActivityTitle: 'Agil utveckling',
      Activity: 'Module 2',
      ActivityType: 'Video',
      ActvityDetails:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis suscipit sequi eos doloremque. Voluptas reprehenderit fuga aliquam quo qui. Nam dolores earum ea odit quod iusto soluta enim voluptas excepturi!',
    },
    {
      moduleID: '103',
      Activity: 'Module 3',
      ActivityTitle: 'Assignment',
      ActivityType: 'PDF File',
      ActvityDetails:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis suscipit sequi eos doloremque. Voluptas reprehenderit fuga aliquam quo qui. Nam dolores earum ea odit quod iusto soluta enim voluptas excepturi!',
    },
  ]
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        if (!courseId) {
          setError('No course ID provided')
          return
        }

        const data = await courseService.getCourseById(courseId)
        console.log('API response:', data)
        setCourse(data)
      } catch (err) {
        setError('Failed to load course')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
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
      {/* Add more fields here as needed */}
      <>
        <h2>Module </h2>
        {/* Bootstrap Accordion */}
        <div className='accordion' id='accordionExample'>
          {modules.map((module, index) => (
            <div className='accordion-item' key={module.moduleID}>
              <h2 className='accordion-header'>
                <button
                  className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={`#collapse${module.moduleID}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${module.moduleID}`}
                >
                  <div className='p-3'>{module.Activity}</div>
                  {module.ActivityTitle}
                </button>
              </h2>
              <div
                id={`collapse${module.moduleID}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                data-bs-parent='#accordionExample'
              >
                <div className='accordion-body'>
                  <strong>{module.ActivityTitle}</strong> {/*TODO Activity */}
                  <p>{module.ActvityDetails}</p>
                  <div className='btn btn-info'>{module.ActivityType}</div>
                  {/* <div className='btn btn-outline-danger'>Quiz</div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </section>
  )
}

export default CourseDetails
