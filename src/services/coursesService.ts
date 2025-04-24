import { ApiResponse } from '../interfaces/components/ApiResponse'
import apiService from '../api/apiService'

const courseService = {
  getAllCourses<T>(): Promise<ApiResponse<T>> {
    console.log('Fetching all courses')
    return apiService.getAll<T>('course')
  },
  getAllStudentCourses<T>(courseId:string): Promise<ApiResponse<T>> {
    console.log('Fetching all courses')
    return apiService.getAll<T>(`student/course/${courseId}`)
  },
  getCourseById<T>(courseId: string): Promise<ApiResponse<T>> {
    if (!courseId) {
      throw new Error('Course ID is required')
    }
    console.log(`Fetching course with ID: ${courseId}`)
    return apiService.getById<T>('course', courseId)
  },

  createCourse: async <T>(data: T): Promise<ApiResponse<T>> => {
    try {
      console.log('Creating course with data:', data)
      const response = await apiService.create<T, T>('course', data)
      console.log('Course created successfully:', response)
      return response
    } catch (error) {
      console.error('Error creating course:', error)
      throw error
    }
  },

  updateCourse: async <T>(
    courseId: string,
    courseData: T
  ): Promise<ApiResponse<T>> => {
    try {
      if (!courseId) {
        throw new Error('Course ID is required for update')
      }
      console.log(`Updating course ${courseId} with:`, courseData)
      const response = await apiService.update<T, T>(
        'course',
        courseId,
        courseData
      )
      console.log('Course updated successfully:', response)
      return response
    } catch (error) {
      console.error(`Error updating course ${courseId}:`, error)
      throw error
    }
  },

  deleteCourse: async <T>(courseId: string): Promise<ApiResponse<T>> => {
    try {
      if (!courseId) {
        throw new Error('Course ID is required for deletion')
      }
      console.log(`Deleting course with ID: ${courseId}`)
      const response = await apiService.delete<T>('course', courseId)
      console.log('Course deleted successfully:', response)
      return response
    } catch (error) {
      console.error(`Error deleting course ${courseId}:`, error)
      throw error
    }
  },
}

export default courseService
