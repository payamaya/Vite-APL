import { ApiResponse } from '../interfaces/components/ApiResponse'
import apiService from '../api/apiService'

const activityService = {
  getAllActivities<T>(): Promise<ApiResponse<T>> {
    return apiService.getAll<T>('activities')
  },

  getActivityById<T>(activityId: string): Promise<ApiResponse<T>> {
    return apiService.getById<T>('activities', activityId)
  },

  createActivity<T>(activityData: T): Promise<ApiResponse<T>> {
    return apiService.create<T, T>('activities', activityData)
  },

  updateActivity<T>(
    activityId: string,
    activityData: T
  ): Promise<ApiResponse<T>> {
    return apiService.update<T, T>('activities', activityId, activityData)
  },

  deleteActivity<T>(activityId: string): Promise<ApiResponse<T>> {
    return apiService.delete<T>('activities', activityId)
  },
}

export default activityService
