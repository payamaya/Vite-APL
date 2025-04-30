import { IBaseEntity } from '../../base/IBaseEntity'

// src/interfaces/IPerson.ts (common person properties)
export interface IPerson extends IBaseEntity {
  firstName: string
  lastName: string
  email: string
  telephone?: string | number
  address?: string
}
