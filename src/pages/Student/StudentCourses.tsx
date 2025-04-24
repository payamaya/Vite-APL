import { useEffect, useState } from "react"
import courseService from "../../services/coursesService"
import { ICourse } from "../../interfaces/components/ICourse"
import { Link } from "react-router-dom"
import ReusableTable from "../../Components/common/tables/ReusableTable"
import courseTableColumns from "../../Components/common/tables/courseTableColumns"

function StudentCourses() {

    const [courses, setCourses] = useState<ICourse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses<ICourse[]>()
        setCourses(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])
 return <main>
    
    <div className='container'>
      <article className='row'>
      <section className='col-12'>
          <div className='card shadow-sm'>
            <header className='card-header bg-warning text-white'>
              <h5 id='courses-section' className='h5'>
                Student Courses
              </h5>
            </header>
            <div className='card-body'>
              {loading && (
                <p className='text-center' role='status'>
                  Loading...
                </p>
              )}
              {error && (
                <div className='alert alert-danger' role='alert'>
                  Errorr....
                </div>
              )}
              {courses.length === 0 && !loading && !error && (
                <div className='alert alert-info' role='status'>
                  You haven't created any courses yet.
                </div>
              )}
              {courses.length > 0 && (
                <ReusableTable
                  data={courses}
                  columns={courseTableColumns}
                  searchPlaceholder='Search Courses...'
                  onRowClick={(course) =>
                    console.log('Selected course:', course)
                  }
                />
              )}
            </div>
          </div>
        </section>
      </article>
    </div>
  </main>
}

export default StudentCourses

