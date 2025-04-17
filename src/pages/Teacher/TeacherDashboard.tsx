import { Outlet } from 'react-router-dom'
import TeacherNav from './TeacherNav'

function TeacherDashboard() {
  return (
    <section
      className='p-5 bg-secondary d-flex justify-content-center flex-column'
      style={{ width: '100vw' }}
    >
      <header className='p-5 d-flex justify-content-center flex-column'>
        <h3 className='text-center mt-5'>Teacher Portal</h3>
        <TeacherNav />
      </header>
      {/* <main className='flex-grow-1'> */}
      <Outlet />
      {/* </main> */}
    </section>
  )
}

export default TeacherDashboard
