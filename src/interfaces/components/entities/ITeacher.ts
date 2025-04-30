// src/interfaces/components/entities/ITeacher.ts

import { IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { IPerson } from './IPerson'

export type TeacherTypeProfession = 'it' | 'matematik' | 'design' | 'teknik'

export interface ITeacher
  extends IDescriptiveEntity,
    ITimeBoundEntity,
    IPerson {
  //TODO FIx later name like we have in the IPerson to prevent duplication

  message?: string
  address?: string
  teacherType: TeacherTypeProfession
  role: string
  description?: string
}
