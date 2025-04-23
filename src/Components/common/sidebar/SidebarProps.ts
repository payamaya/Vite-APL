import { RoleOrPublic } from '../../../types'
import { NavItem } from '../../navbar/navbarInterfaces'

export interface SidebarProps {
  role: RoleOrPublic
  navItems: NavItem[]
}
