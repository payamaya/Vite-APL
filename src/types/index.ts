// src/types/index.ts
export type UserRole = 'admin' | 'teacher' | 'student' | 'public' | 'all'
// export type UserRole = 'student' | 'teacher' | 'admin'
export type RoleOrPublic = UserRole // Add 'all' for public items
export interface DecodedToken {
  role: RoleOrPublic
  exp: number
  iat: number
  // Add other token fields as needed
}
