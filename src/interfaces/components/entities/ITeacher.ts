// src/interfaces/components/entities/ITeacher.ts

import { IDescriptiveEntity, ITimeBoundEntity } from '../../base'

export type TeacherTypeProfession = 'it' | 'matematik' | 'design' | 'teknik'

export interface ITeacher extends IDescriptiveEntity, ITimeBoundEntity {
  id: string
  name: string
  teacherType: TeacherTypeProfession
  email: string
  message?: string
  telephone?: string | number
  role: string
  img?: string
  createdAt?: string
}
