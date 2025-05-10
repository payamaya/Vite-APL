import { UserRoleValue } from '../../../constants/RolesEnum'
import { IUser } from './IUser'

export type TeacherTypeProfession = 'it' | 'matematik' | 'design' | 'teknik'

export interface ITeacher extends IUser {
  //TODO FIx later name like we have in the IPerson to prevent duplication
  role: Extract<UserRoleValue, 'teacher'>
  teacherType?: TeacherTypeProfession
  department?: string
  coursesTaught?: string[] // Course IDs
  bio?: string
}
