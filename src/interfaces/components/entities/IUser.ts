import { UserRoleValue } from '../../../constants/RolesEnum'
import { IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { IPerson } from './IPerson'

export type UserTypeProfession = 'student' | 'teacher'

export interface IUser extends IDescriptiveEntity, ITimeBoundEntity, IPerson {
  //TODO FIx later name like we have in the IPerson to prevent duplication

  email: string
  role: UserRoleValue
  password?: string
  message?: string
  userType?: UserTypeProfession
  isActive?: boolean
  lastLogin?: Date
}
