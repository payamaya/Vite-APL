// import { useState, useEffect } from 'react'
// import courseService from '../../services/coursesService'
// import { ICourse } from '../../interfaces/components/ICourse'
// import { Link } from 'react-router-dom'
// import { useDeleteHandler } from '../../hooks/useDeleteHandler'

// const TeacherCourses = () => {
//   const [courses, setCourses] = useState<ICourse[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<Error | null>(null)

//   const { error: deleteError } = useDeleteHandler<ICourse>(
//     courseService.deleteCourse,
//     setCourses,
//     courses
//   )

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await courseService.getAllCourses<ICourse[]>()
//         setCourses(response.data)
//         setLoading(false)
//       } catch (err) {
//         setError(err as Error)
//         setLoading(false)
//       }
//     }

//     fetchCourses()
//   }, [])

//   return (
//     <div className='container mt-4'>
//       <div className='row'>
//         {/* Dashboard Header */}
//         <div className='col-12'>
//           <div className='card border-primary'>
//             <div className='card-header bg-primary text-white'>
//               <h2>My Courses</h2>
//             </div>
//             <div className='card-body'>
//               <h5>Manage your courses here</h5>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Courses Section */}
//       <div className='row mt-4'>
//         <div className='col-12'>
//           <div className='card'>
//             <div className='card-header bg-secondary text-white'>
//               <h5>Your Courses</h5>
//             </div>
//             <div className='card-body'>
//               {loading && <p className='text-center'>Loading courses...</p>}
//               {error && (
//                 <div className='alert alert-danger'>{error.message}</div>
//               )}
//               {deleteError && (
//                 <div className='alert alert-danger'>{deleteError}</div>
//               )}
//               {courses.length === 0 ? (
//                 <div className='alert alert-info'>
//                   You haven't created any courses yet.
//                 </div>
//               ) : (
//                 <div className='row'>
//                   {courses.map((course) => (
//                     <div key={course.id} className='col-md-4'>
//                       <div className='card mb-4 shadow'>
//                         <div className='card-body'>
//                           <h5>{course.name}</h5>
//                           <h6 className='text-muted'>{course.title}</h6>
//                           <p>{course.description}</p>
//                           <Link
//                             to={`/teacher/courses/${course.id}`}
//                             className='btn btn-primary'
//                           >
//                             View Details
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TeacherCourses
import { useEffect, useState } from 'react'
import { ICourse } from '../../interfaces/components/ICourse'

import courseService from '../../services/coursesService'
import ReusableTable from '../../Components/common/tables/ReusableTable'
import courseTableColumns from '../../Components/common/tables/courseTableColumns'

const TeacherCourses = () => {
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

  return (
    <main className='container'>
      <article className='row'>
        <section className='col-12 w-full d-flex justify-content-center'>
          <div className='card border-primary'>
            <header>
              <h1 id='dashboard-header'>My Courses</h1>
            </header>

            <div className='card-body'>
              <h5 className='h5 d-flex justify-content-center'>
                Manage your courses here
              </h5>
            </div>
          </div>
        </section>
      </article>

      <article
        className='row w-100 justify-content-center my-4'
        aria-labelledby='courses-section'
      >
        <section className='col-12'>
          <div className='card shadow-sm'>
            <header className='card-header bg-warning text-white'>
              <h5 id='courses-section' className='h5'>
                Your Courses
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
    </main>
  )
}

export default TeacherCourses
