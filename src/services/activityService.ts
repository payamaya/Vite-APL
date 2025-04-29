import createNestedEntityService from './nestedEntityServiceFactory'
import { IActivity } from '../interfaces/components/entities/IActivity'

const activitiesService = createNestedEntityService<IActivity>(
  'course/module',
  'activity'
)

export const activityService = {
  getAllActivities: activitiesService.getAll,
  getActivityById: activitiesService.getById,
  createActivity: activitiesService.create,
  updateActivity: activitiesService.update,
  deleteActivity: activitiesService.delete,
}
