import { UserRoleValue } from '../../../contants/RolesEnum'
import { IUser } from './IUser'

export interface IStudent extends IUser {
  label?: string
  role: Extract<UserRoleValue, 'student'> // Strictly student role
  studentId: string
  enrollmentDate: Date
  currentCourses?: {
    courseId: string
    enrollmentDate: Date
    status: 'active' | 'completed' | 'withdrawn'
  }[]
}
