export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher', // Changed to lowercase
  STUDENT: 'student',
  USER: 'user',
  GUEST: 'guest',
} as const

export type UserRoleValue = (typeof ROLES)[keyof typeof ROLES] // 'admin' | 'teacher' | 'student' | 'guest'
export type UserRole = keyof typeof ROLES // 'ADMIN' | 'TEACHER' | 'STUDENT' | 'GUEST'
