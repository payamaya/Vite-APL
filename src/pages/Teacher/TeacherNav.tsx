// import { useLocation, useNavigate } from 'react-router-dom'
// import ReusableButton from '../../Components/common/buttons/ReusableButton'

// const TeacherNav = () => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   // Helper function to check if the current path is active
//   const isActive = (path: string) =>
//     location.pathname.startsWith(`/teacher/${path}`)

//   return (
//     <div className='d-flex flex-column bg-light p-3 d-flex justify-content-center'>
//       <nav className='d-flex flex-column p-3 col-md-3 col-lg-2 d-md-block bg-light sidebar '>
//         <ul className='nav nav-pills flex-column mb-auto flex-column '>
//           <li className='nav-item'>
//             <ReusableButton
//               className={`nav-link py-3 px-4 mb-3 rounded d-flex align-items-center ${
//                 isActive('dashboard') ? 'bg-primary text-white' : 'text-dark'
//               }`}
//               onClick={() => navigate('/teacher/dashboard')}
//             >
//               <i className='bi bi-house-door me-3'>
//                 <span>Dashboard</span>
//               </i>
//             </ReusableButton>
//           </li>
//           <li className='nav-item'>
//             <ReusableButton
//               className={`nav-link py-3 px-4 mb-3 rounded d-flex align-items-center ${
//                 isActive('courses') ? 'bg-primary text-white' : 'text-dark'
//               }`}
//               onClick={() => navigate('/teacher/courses')}
//             >
//               <i className='bi bi-book me-3'>
//                 <span>My Courses</span>
//               </i>
//             </ReusableButton>
//           </li>
//           <li className='nav-item'>
//             <ReusableButton
//               className={`nav-link py-3 px-4 mb-3 rounded d-flex align-items-center ${
//                 isActive('notice') ? 'bg-primary text-white' : 'text-dark'
//               }`}
//               onClick={() => navigate('/teacher/notice')}
//             >
//               <i className='bi bi-book me-3'>
//                 <span>Notice</span>
//               </i>
//             </ReusableButton>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default TeacherNav
