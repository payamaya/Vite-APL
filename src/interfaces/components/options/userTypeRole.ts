import { UserTypeProfession } from '../entities/IUser'

export const userTypeProfessionOptions: {
  value: UserTypeProfession
  label: string
}[] = [
  { value: 'student', label: 'Student' },
  { value: 'teacher', label: 'Teacher' },
]
