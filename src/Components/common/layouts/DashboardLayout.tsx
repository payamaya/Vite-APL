import Sidebar from '../sidebar/SideBar'
import {
  PUBLIC_NAV_ITEMS,
  ADMIN_NAV_ITEMS,
  TEACHER_NAV_ITEMS,
  STUDENT_NAV_ITEMS,
  USER_NAV_ITEMS,
} from '../../../config/navItems'

import { NavItem } from '../../../interfaces/components/NavbarInterfaces'

import { DashboardLayoutProps } from './DashboardLayoutProps'
import { Outlet } from 'react-router-dom'
import LogoutButton from '../buttons/LogoutButton'
import { useNotification } from '../../../context/NotificationContext'
import { getErrorMessage } from '../../../utils/errorUtils'

const DashboardLayout = ({
  role,
  children,
  title,
  navItems,
}: DashboardLayoutProps) => {
  let roleNavItems: NavItem[] = []

  const { showNotification } = useNotification()
  if (navItems) {
    roleNavItems = navItems
  } else {
    switch (role) {
      case 'admin':
        roleNavItems = ADMIN_NAV_ITEMS
        break
      case 'teacher':
        roleNavItems = TEACHER_NAV_ITEMS
        break
      case 'student':
        roleNavItems = STUDENT_NAV_ITEMS
        break
      case 'user':
        roleNavItems = USER_NAV_ITEMS
        break
      default:
        console.warn(`Unknown role: ${role}`)
        roleNavItems = PUBLIC_NAV_ITEMS
    }
  }

  return (
    <div className='container-fluid d-flex flex-column '>
      <div className='d-flex overflow-hidden position-relative'>
        <Sidebar role={role} navItems={roleNavItems} />

        <main className=' p-4 container-fluid'>
          <div className='py-4 sm-container-fluid'>
            <div className='d-flex justify-content-center align-items-center mb-4'>
              <h1 className='display-1 display-md-3 display-sm-4'>{title}</h1>
              <LogoutButton
                theme='light'
                className='ms-3'
                startIcon={<i className='bi bi-box-arrow-right'></i>}
                onSuccess={() =>
                  showNotification({
                    message: `Logged out ${title} successfully`,
                    variant: 'info',
                  })
                }
                onError={(error) =>
                  showNotification({
                    message: getErrorMessage(error),
                    variant: 'danger',
                  })
                }
              />
            </div>
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
