import { IBaseEntity } from '../../base/IBaseEntity'

export interface IPerson extends IBaseEntity {
  firstName: string
  lastName: string
  email: string
  telephone?: string | number
  address?: {
    street?: string
    city?: string
    postalCode?: string
    country?: string
  }
  dateOfBirth?: Date
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say'
}
