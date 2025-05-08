import { UserRoleValue } from '../../../constants/RolesEnum'
import { IUserBase } from './IUserBase'

export interface IStudent extends IUserBase {
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
