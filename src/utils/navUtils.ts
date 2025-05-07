import { NavItem } from '../Components/common/navbar/Navbar.types'
import { RoleOrPublic } from '../types'

export const filterNavItemsByRole = (
  items: NavItem[] = [],
  currentRole?: RoleOrPublic
): NavItem[] => {
  return items.filter(
    (item) => !item.role || item.role === null || item.role === currentRole
  )
}
