import { IBaseEntity, IDescriptiveEntity, ITimeBoundEntity } from '../../base'
import { ActivityType } from '../types/activityType'

export interface IActivity
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  moduleId?: string
  content?: string
  activityType: ActivityType

  metadata?: Record<string, unknown>
  submissionRequirements?: {
    isRequired: boolean
    deadline?: Date
    maxAttempts?: number
  }
}
