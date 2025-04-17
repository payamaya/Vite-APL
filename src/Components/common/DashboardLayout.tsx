import { ReactNode } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../navbar/SideBar'
import {
  PUBLIC_NAV_ITEMS,
  NAV_BRAND,
  ADMIN_NAV_ITEMS,
  TEACHER_NAV_ITEMS,
  STUDENT_NAV_ITEMS,
} from '../../config/navItems'

import { NavItem } from '../../interfaces/components/NavbarInterfaces'
import { RoleOrPublic } from '../../types'

interface DashboardLayoutProps {
  role: RoleOrPublic
  children: ReactNode
  title: string
}

const DashboardLayout = ({ role, children, title }: DashboardLayoutProps) => {
  let roleNavItems: NavItem[] = []

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

  return (
    <div className='d-flex flex-column vh-100'>
      <Navbar
        brand={NAV_BRAND}
        navItems={PUBLIC_NAV_ITEMS}
        currentRole={role}
      />

      <div className='d-flex flex-grow-1'>
        <Sidebar role={role} navItems={roleNavItems} />
        <div className='flex-grow-1 p-4 overflow-auto'>
          <h2 className='mb-4'>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
