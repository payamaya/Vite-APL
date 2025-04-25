export type TeacherTypeProfession = 'it' | 'matematik' | 'design' | 'teknik'

export interface ITeacher {
  teacherType: TeacherTypeProfession
  createdAt?: string
  message: string
  email: string
  telephone?: string | number
  id: string
  name: string
  title: string
  description: string
  img?: string
}
