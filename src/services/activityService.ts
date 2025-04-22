// src/services/activityService.ts
import { ApiResponse } from '../interfaces/components/ApiResponse'
import apiService from '../api/apiService'

const activityService = {
  getAllActivities<T>(moduleId: string): Promise<ApiResponse<T>> {
    console.log(`Fetching activities for module ${moduleId}`)
    return apiService.getAll<T>(`course/module/${moduleId}/activity`)
  },

  getActivityById<T>(
    moduleId: string,
    activityId: string
  ): Promise<ApiResponse<T>> {
    if (!moduleId || !activityId) {
      throw new Error('Module ID and Activity ID are required')
    }
    console.log(`Fetching activity ${activityId} from module ${moduleId}`)
    return apiService.getById<T>(
      `course/module/${moduleId}/activity`,
      activityId
    )
  },

  createActivity: async <T>(
    moduleId: string,
    activityData: T
  ): Promise<ApiResponse<T>> => {
    try {
      if (!moduleId) {
        throw new Error('Module ID is required')
      }
      console.log(
        `Creating activity for module ${moduleId} with data:`,
        activityData
      )
      const response = await apiService.create<T, T>(
        `course/module/${moduleId}/activity`,
        activityData
      )
      console.log('Activity created successfully:', response)
      return response
    } catch (error) {
      console.error('Error creating activity:', error)
      throw error
    }
  },

  updateActivity: async <T>(
    moduleId: string,
    activityId: string,
    activityData: T
  ): Promise<ApiResponse<T>> => {
    try {
      if (!moduleId || !activityId) {
        throw new Error('Module ID and Activity ID are required for update')
      }
      console.log(
        `Updating activity ${activityId} in module ${moduleId} with:`,
        activityData
      )
      const response = await apiService.update<T, T>(
        `course/module/${moduleId}/activity`,
        activityId,
        activityData
      )
      console.log('Activity updated successfully:', response)
      return response
    } catch (error) {
      console.error(`Error updating activity ${activityId}:`, error)
      throw error
    }
  },

  deleteActivity: async <T>(
    moduleId: string,
    activityId: string
  ): Promise<ApiResponse<T>> => {
    try {
      if (!moduleId || !activityId) {
        throw new Error('Module ID and Activity ID are required for deletion')
      }
      console.log(`Deleting activity ${activityId} from module ${moduleId}`)
      const response = await apiService.delete<T>(
        `course/module/${moduleId}/activity`,
        activityId
      )
      console.log('Activity deleted successfully:', response)
      return response
    } catch (error) {
      console.error(`Error deleting activity ${activityId}:`, error)
      throw error
    }
  },
}

export default activityService
