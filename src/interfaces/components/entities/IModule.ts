import { IBaseEntity, IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { ActivityType } from '../types/activityType'

// src/interfaces/IModule.ts
export type ActivityDetails = string | string[] | Record<string, unknown>

// src/interfaces/IModule.ts
export interface IModule
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  name: string
  courseId: string
  activityDetails?: string // Simple string type
  activityType?: ActivityType
}
