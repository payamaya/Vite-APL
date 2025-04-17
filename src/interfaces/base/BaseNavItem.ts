import { RoleOrPublic } from '../../types'

export interface BasNavItem {
  label: string
  link: string
  role?: RoleOrPublic
  icon?: React.ReactNode
}
