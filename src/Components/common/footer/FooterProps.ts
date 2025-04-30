import { RoleOrPublic } from '../../../types'
import { NavItem } from '../navbar/Navbar.types'

export interface FooterProps {
  footerItems: NavItem[]
  currentRole?: RoleOrPublic
  brand?: string
  fixed?: 'top' | 'bottom'
}
