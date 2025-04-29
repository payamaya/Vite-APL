import { ReactNode } from 'react'
import { RoleOrPublic } from '../../../types'
import { NavItem } from '../navbar/Navbar.types'

export interface DashboardLayoutProps {
  role: RoleOrPublic
  children: ReactNode
  title: string
  navItems?: NavItem[]
}
