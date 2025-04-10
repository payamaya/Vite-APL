import apiService from './apiService'

const courseService = {
  getAllCourses<T>() {
    return apiService.getAll<T>('course')
  },

  getCourseById<T>(courseId: string) {
    return apiService.getById<T>('course', courseId)
  },

  createCourse<T>(courseData: T) {
    return apiService.create<T>('course', courseData)
  },

  updateCourse<T>(courseId: string, courseData: T) {
    return apiService.update<T>('course', courseId, courseData)
  },

  deleteCourse<T>(courseId: string) {
    return apiService.delete<T>('course', courseId)
  },
}

export default courseService
