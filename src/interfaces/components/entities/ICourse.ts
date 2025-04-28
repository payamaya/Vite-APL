import { IBaseEntity, IDescriptiveEntity, ITimeBoundEntity } from '../../base'

export interface ICourse
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  name: string
  message: string
  // No need to redeclare title, description, startDate, endDate, img, etc.
}
