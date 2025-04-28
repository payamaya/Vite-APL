import { IBaseEntity, IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { ActivityType } from '../types/activityType'

export interface IActivity
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  moduleId?: string
  content?: string
  activityType: ActivityType
}
