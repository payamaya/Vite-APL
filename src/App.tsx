import Navbar from './Components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
      <Navbar
        brand='My E-Learning Platform'
        navItems={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Courses', link: '/courses' },
          ///  label: 'CourseDetails', link: '/course--dtails' },
        ]}
        fixed={'top'}
      />
      <AppRoutes />
    </>
  )
}

export default App
