import { UserRoleValue } from '../../../constants/RolesEnum'
import { IUserBase } from './IUserBase'

export interface IAdmin extends IUserBase {
  role: Extract<UserRoleValue, 'admin'>
  permissions: {
    canManageUsers: boolean
    canManageContent: boolean
  }
}
