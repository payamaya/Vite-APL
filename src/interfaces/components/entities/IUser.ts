// src/interfaces/components/entities/ITeacher.ts

import { IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { IPerson } from './IPerson'

export type UserTypeProfession = 'student' | 'teacher'

export interface IUser extends IDescriptiveEntity, ITimeBoundEntity, IPerson {
  //TODO FIx later name like we have in the IPerson to prevent duplication

  message?: string
  address?: string
  password?: string
  userType?: UserTypeProfession
  role: string
  description?: string
}
