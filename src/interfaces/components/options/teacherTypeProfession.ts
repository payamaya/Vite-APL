import { TeacherTypeProfession } from '../entities/ITeacher'

export const teacherTypeProfessionOptions: {
  value: TeacherTypeProfession
  label: string
}[] = [
  { value: 'it', label: 'IT' },
  { value: 'matematik', label: 'Mathematics' },
  { value: 'design', label: 'Design' },
  { value: 'teknik', label: 'Technique' },
]
