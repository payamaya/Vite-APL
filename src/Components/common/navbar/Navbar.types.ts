import { RoleOrPublic } from '../../../types'

// Base interface that both NavItem and DropdownItem extend
export interface BaseNavItem {
  label: string
  link: string
  role?: RoleOrPublic
  icon?: React.ReactNode
}

export interface NavItem extends BaseNavItem {
  disabled?: boolean
}

export interface DropdownItem extends BaseNavItem {
  items: NavItem[]
}

export type FixedPosition = 'top' | 'bottom'

export interface NavbarProps {
  brand: string
  navItems: NavItem[]
  dropdownLabel?: string
  dropdownItems?: DropdownItem[]
  fixed?: FixedPosition
  currentRole?: RoleOrPublic | null
  showSearch?: boolean
}
