// src/types/index.ts
export type UserRole = 'student' | 'teacher' | 'admin'
export type RoleOrPublic = UserRole | 'all' // Add 'all' for public items
export interface DecodedToken {
  role: RoleOrPublic
  exp: number
  iat: number
  // Add other token fields as needed
}
