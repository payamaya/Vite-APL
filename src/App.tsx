import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import './styles/App.css'

// import Courses from './pages/Courses'
// import Dashboard from './pages/Dashboard'
// import NotFound from './pages/NotFound'
// import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar
        brand='My E-Learning Platform'
        navItems={[
          { label: 'Home', link: '/' },
          { label: 'About', link: '/about' },
          { label: 'Courses', link: '/courses' },
          // { label: 'CourseDetails', link: '/course-details' },
        ]}
        fixed={'top'}
      />

      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/courses'} element={<Courses />} />
        <Route path={'/courses/:courseID'} element={<CourseDetails />} />
        {/* <Route path='/courses' element={<Courses />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </>
  )
}

export default App
