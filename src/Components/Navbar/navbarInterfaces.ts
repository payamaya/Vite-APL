import { RoleOrPublic } from '../../types'

export interface NavItem {
  label: string
  link: string
  disabled?: boolean
  role?: RoleOrPublic
  icon?: React.ReactNode
}
// export interface DropdownItem extends NavItem {}

export interface NavbarProps {
  brand: string
  navItems: NavItem[]
  dropdownLabel?: string
  dropdownItems?: NavItem[]
  fixed?: 'top' | 'bottom'
  currentRole?: RoleOrPublic
}
