import apiService from './apiService'
const activityService = {
  getAllActivities: () => apiService.getAll('activities'),
  getAllActivityById: (activityId: string) =>
    apiService.getById('activities', activityId),
  createActivity: (activityData: object) =>
    apiService.create('activities', activityData),
  updateActivity: (activityId: string, activityData: object) =>
    apiService.update('activities', activityId, activityData),
  deleteActivity: (activityId: string) =>
    apiService.delete('activities', activityId),
}
export default activityService
