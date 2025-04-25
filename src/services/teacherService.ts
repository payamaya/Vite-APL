import { ApiResponse } from '../interfaces/components/ApiResponse'
import apiService from '../api/apiService'

const teacherService = {
  getAllTeachers<T>(): Promise<ApiResponse<T>> {
    console.log('Fetching all teachers')
    return apiService.getAll<T>('teacher')
  },

  getTeacherById<T>(teacherId: string): Promise<ApiResponse<T>> {
    if (!teacherId) throw new Error('Teacher ID is required')
    console.log(`Fetching teacher with ID: ${teacherId}`)
    return apiService.getById<T>('teacher', teacherId)
  },

  createTeacher: async <T>(data: T): Promise<ApiResponse<T>> => {
    try {
      console.log('Creating teacher with data:', data)
      const response = await apiService.create<T, T>('teacher', data)
      console.log('Teacher created successfully:', response)
      return response
    } catch (error) {
      console.error('Error creating teacher:', error)
      throw error
    }
  },

  updateTeacher: async <T>(
    teacherId: string,
    teacherData: T
  ): Promise<ApiResponse<T>> => {
    try {
      if (!teacherId) throw new Error('Teacher ID is required for update')
      console.log(`Updating teacher ${teacherId} with:`, teacherData)
      const response = await apiService.update<T, T>(
        'teacher',
        teacherId,
        teacherData
      )
      console.log('Teacher updated successfully:', response)
      return response
    } catch (error) {
      console.error(`Error updating teacher ${teacherId}:`, error)
      throw error
    }
  },

  deleteTeacher: async <T>(teacherId: string): Promise<ApiResponse<T>> => {
    try {
      if (!teacherId) throw new Error('Teacher ID is required for deletion')
      console.log(`Deleting teacher with ID: ${teacherId}`)
      const response = await apiService.delete<T>('teacher', teacherId)
      console.log('Teacher deleted successfully:', response)
      return response
    } catch (error) {
      console.error(`Error deleting teacher ${teacherId}:`, error)
      throw error
    }
  },
}

export default teacherService
