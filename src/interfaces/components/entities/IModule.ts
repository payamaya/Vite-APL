// src/interfaces/IModule.ts
import { IBaseEntity } from '../../base/IBaseEntity'
import { IDescriptiveEntity } from '../../base/IDescriptiveEntity'
import { ITimeBoundEntity } from '../../base/ITimeBoundEntity'
import { ActivityType } from '../types/activityType'

export interface IModule
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  name: string
  courseId: string
  activityDetails: unknown // Better than 'any'
  activityType?: ActivityType
}
