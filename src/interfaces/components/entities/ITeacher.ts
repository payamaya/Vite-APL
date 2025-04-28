import { IDescriptiveEntity } from '../../base/IDescriptiveEntity'
import { ITimeBoundEntity } from '../../base/ITimeBoundEntity'

export interface ITeacher extends IDescriptiveEntity, ITimeBoundEntity {
  id: string
  name: string // Consider aligning with IPerson's firstName/lastName
  message: string
  img?: string
}
