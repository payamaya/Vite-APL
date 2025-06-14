import { useEffect, useState } from 'react'
import { courseService, studentService } from '../../services'
import {
  ReusableTable,
  courseTableColumns,
  studenTableColumns,
} from '../../Components/common/tables'
import { ICourse, IStudent } from '../../interfaces/components/entities'

function AdminCourses() {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [students, setStudents] = useState<IStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await courseService.getAllCourses()
        setCourses(
          Array.isArray(response.data) ? response.data : [response.data]
        )
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await studentService.getAllStudents()
        setStudents(response.data as unknown as IStudent[])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <main className='row'>
      <section className='col-12 mt-4'>
        <div className='card shadow-sm'>
          <header className='card-header bg-primary text-white'>
            <h5 id='courses-section' className='h5'>
              Admin Dashboard Courses
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
                onRowClick={(course) => console.log('Selected course:', course)}
              />
            )}
          </div>
        </div>
      </section>
      <section className='col-12 mt-4'>
        <div className='card shadow-sm'>
          <header className='card-header bg-primary text-white'>
            <h5 id='courses-section' className='h5'>
              Admin Dashboard Students
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
            {students.length === 0 && !loading && !error && (
              <div className='alert alert-info' role='status'>
                You haven't created any students yet.
              </div>
            )}
            {students.length > 0 && (
              <ReusableTable
                data={students}
                columns={studenTableColumns}
                searchPlaceholder='Search Students...'
                onRowClick={(student) =>
                  console.log('Selected student:', student)
                }
              />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default AdminCourses
