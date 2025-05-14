import { IBaseEntity, IDescriptiveEntity, ITimeBoundEntity } from '../../base'

export interface ICourse
  extends IBaseEntity,
    ITimeBoundEntity,
    IDescriptiveEntity {
  name: string
  message: string
  code?: string // Course code like "CS101"
  credits?: number
  prerequisites?: string[] // Array of course IDs
  instructorIds?: string[] // Array of teacher IDs
  status?: 'draft' | 'published' | 'archived'
}
