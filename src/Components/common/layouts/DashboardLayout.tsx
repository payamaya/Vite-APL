// import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/SideBar'
import {
  PUBLIC_NAV_ITEMS,
  // NAV_BRAND,
  ADMIN_NAV_ITEMS,
  TEACHER_NAV_ITEMS,
  STUDENT_NAV_ITEMS,
} from '../../../config/navItems'

import { NavItem } from '../../../interfaces/components/NavbarInterfaces'

import { DashboardLayoutProps } from './DashboardLayoutProps'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({
  role,
  children,
  title,
  navItems,
}: DashboardLayoutProps) => {
  let roleNavItems: NavItem[] = []

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
      default:
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
            </div>
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
