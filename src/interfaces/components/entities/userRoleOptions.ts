import { UserRoleValue } from '../../../constants/RolesEnum'

export const userRoleOptions: {
  value: UserRoleValue
  label: string
}[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
]
