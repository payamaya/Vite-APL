// src/types/index.ts
export type UserRole = 'student' | 'teacher' | 'admin'

export interface DecodedToken {
  role: UserRole
  exp: number
  iat: number
  // Add other token fields as needed
}
