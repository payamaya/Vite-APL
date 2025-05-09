import { IBaseEntity, IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { ActivityType } from '../types/activityType'
import { IActivity } from './IActivity'
import { ModuleResource } from './ModuleResources'

// src/interfaces/IModule.ts
export type ActivityDetails = string | string[] | Record<string, unknown>

// src/interfaces/IModule.ts
export interface IModule
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  name: string
  courseId: string
  sequence?: number // Module order in course
  resources: ModuleResource[]
  activityDetails?: string // Simple string type
  activities: IActivity[]
  moduleType?: ActivityType
}
