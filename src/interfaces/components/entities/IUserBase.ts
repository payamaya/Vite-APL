import { UserRoleValue } from '../../../contants/RolesEnum'
import { IBaseEntity, ITimeBoundEntity } from '../../base'

export interface IUserBase extends IBaseEntity, ITimeBoundEntity {
  email: string
  role: UserRoleValue
  isActive: boolean
  lastLogin?: Date
}
