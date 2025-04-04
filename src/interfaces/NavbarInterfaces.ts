import { BasNavItem } from './base/BaseNavItem'

export interface NavItem extends BasNavItem {
  disabled?: boolean
}
export interface DropdownItem extends BasNavItem {
  items: BasNavItem[]
}

export type FixedPosition = 'top' | 'bottom'
export interface NavbarProps {
  brand: string
  navItems: NavItem[]
  dropdownLabel?: string
  dropdownItems?: DropdownItem[]
  showSearch?: boolean
  fixed?: FixedPosition
}
