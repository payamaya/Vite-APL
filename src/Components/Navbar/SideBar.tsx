// src/Components/common/Sidebar.tsx
import { useLocation, useNavigate } from 'react-router-dom'
import ReusableButton from '../common/buttons/ReusableButton'
import { NavItem } from '../../interfaces/components/NavbarInterfaces'
import { RoleOrPublic } from '../../types'

interface SidebarProps {
  role: RoleOrPublic
  navItems: NavItem[]
}

const Sidebar = ({ role, navItems }: SidebarProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) =>
    location.pathname.startsWith(`/${role}${path}`)

  return (
    <div className='d-flex flex-column bg-light p-3 d-flex justify-content-center'>
      <nav className='d-flex flex-column p-3 col-md-3 col-lg-2 d-md-block bg-light sidebar'>
        <ul className='nav nav-pills flex-column mb-auto flex-column'>
          {navItems?.map((item) => (
            <li key={`${item.link}-${item.label}`} className='nav-item'>
              <ReusableButton
                className={`nav-link py-3 px-4 mb-3 rounded d-flex align-items-center ${
                  isActive(item.link) ? 'bg-primary text-white' : 'text-dark'
                }`}
                onClick={() => navigate(item.link)}
              >
                <span>{item.label}</span>
              </ReusableButton>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
