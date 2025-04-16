// import { Link } from 'react-router-dom'
import { ICourse } from '../../interfaces/components/ICourse'

interface CourseListProps {
  courses: ICourse[]
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => (
  <section className='row'>
    {courses.map((course) => (
      <div key={course.id} className='col-md-4'>
        <div className='card mb-4 shadow'>
          <div className='card-body'>
            <h5>{course.name}</h5>
            <h6 className='text-muted'>{course.title}</h6>
            <p>{course.description}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
)
export default CourseList
