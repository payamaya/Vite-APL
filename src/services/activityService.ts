import createNestedEntityService from './nestedEntityServiceFactory'
import { IActivity } from '../interfaces/components/IActivity'

const baseService = createNestedEntityService<IActivity>('module', 'activity')

export default {
  getAllActivities: baseService.getAll,
  getActivityById: baseService.getById,
  createActivity: baseService.create,
  updateActivity: baseService.update,
  deleteActivity: baseService.delete,
}
