// src/types/index.ts
import { ROLES } from '../contants/RolesEnum'
export type UserRole = (typeof ROLES)[keyof typeof ROLES]
// export type UserRole = 'student' | 'teacher' | 'admin'
export type RoleOrPublic = UserRole | null // Add 'all' for public items
export interface DecodedToken {
  role: RoleOrPublic
  exp: number
  iat: number
  // Add other token fields as needed
}
