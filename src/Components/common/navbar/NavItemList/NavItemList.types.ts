import { NavItem } from '../Navbar.types'

export interface NavItemListProps {
  items: NavItem[]
  className?: string
  itemClassName?: string
  linkClassName?: string
  onClick?: () => void
}
