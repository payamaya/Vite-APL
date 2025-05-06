import { RoleOrPublic } from '../../../types'
import { NavItem } from '../navbar/Navbar.types'

export type FixedPosition = 'left' | 'right'
export interface SidebarProps {
  role: RoleOrPublic | null
  navItems: NavItem[]
  fixed?: FixedPosition
}
