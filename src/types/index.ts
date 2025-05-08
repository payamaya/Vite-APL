import { UserRoleValue } from '../constants/RolesEnum'

export type RoleOrPublic = UserRoleValue | null
export type AllRoles = UserRoleValue | 'all'
export interface DecodedToken {
  role: RoleOrPublic
  exp: number
  iat: number
  userId: string
}
