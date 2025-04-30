import { RoleOrPublic } from '../../../types'
import { NavItem } from '../navbar/Navbar.types'

export interface SidebarProps {
  role: RoleOrPublic
  navItems: NavItem[]
}
