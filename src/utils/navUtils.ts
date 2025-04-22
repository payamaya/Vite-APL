// utils/navUtils.ts
import { NavItem } from '../Components/navbar/navbarInterfaces'
import { RoleOrPublic } from '../types'

export const filterNavItemsByRole = (
  items: NavItem[] = [],
  currentRole?: RoleOrPublic
): NavItem[] => {
  return items.filter(
    (item) => !item.role || item.role === 'all' || item.role === currentRole
  )
}
