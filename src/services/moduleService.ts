import { ApiResponse } from '../interfaces/components/ApiResponse'
import apiService from '../api/apiService'

const moduleService = {
  getAllModules<T>(courseId: string): Promise<ApiResponse<T>> {
    return apiService.getAll<T>(`course/${courseId}/module`)
  },

  getModuleById<T>(
    courseId: string,
    moduleId: string
  ): Promise<ApiResponse<T>> {
    return apiService.getById<T>(`course/${courseId}/module`, moduleId)
  },

  createModule<T>(courseId: string, moduleData: T): Promise<ApiResponse<T>> {
    return apiService.create<T, T>(`course/${courseId}/module`, {
      ...moduleData,
      courseId, // Ensure courseId is included
    })
  },

  updateModule<T>(
    courseId: string,
    moduleId: string,
    moduleData: T
  ): Promise<ApiResponse<T>> {
    return apiService.update<T, T>(
      `course/${courseId}/module`,
      moduleId,
      moduleData
    )
  },

  deleteModule<T>(courseId: string, moduleId: string): Promise<ApiResponse<T>> {
    return apiService.delete<T>(`course/${courseId}/module`, moduleId)
  },
}

export default moduleService
