import apiService from './apiService'

const moduleService = {
  getAllModules<T>(courseId: string) {
    return apiService.getAll<T>(`course/${courseId}/module`)
  },

  getModuleById<T>(courseId: string, moduleId: string) {
    return apiService.getById<T>(`course/${courseId}/module`, moduleId)
  },

  createModule<T>(courseId: string, moduleData: T) {
    return apiService.create<T>(`course/${courseId}/module`, {
      ...moduleData,
      courseId, // Ensure courseId is included
    })
  },

  updateModule<T>(courseId: string, moduleId: string, moduleData: T) {
    return apiService.update<T>(
      `course/${courseId}/module`,
      moduleId,
      moduleData
    )
  },

  deleteModule<T>(courseId: string, moduleId: string) {
    return apiService.delete<T>(`course/${courseId}/module`, moduleId)
  },
}

export default moduleService
