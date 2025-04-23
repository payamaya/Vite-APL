import { NavItem } from './navbarInterfaces'

export interface NavItemListProps {
  items: NavItem[]
  className?: string
  itemClassName?: string
  linkClassName?: string
  onClick?: () => void
}
