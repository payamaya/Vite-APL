export type TeacherTypeProfession = 'it' | 'matematik' | 'design' | 'teknik'

export interface ITeacher {
  id: string
  name: string
  title: string
  teacherType: TeacherTypeProfession
  email: string
  telephone?: string | number
  role: string
  description: string
  img?: string
  createdAt?: string
}
