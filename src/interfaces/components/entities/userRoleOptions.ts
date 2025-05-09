import { UserRoleValue } from '../../../contants/RolesEnum'

export const userRoleOptions: {
  value: UserRoleValue
  label: string
}[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'student', label: 'Student' },
]
