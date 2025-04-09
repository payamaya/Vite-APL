import apiService from './apiService'

const courseService = {
  getAllCourses: () => apiService.getAll('course'),
  getCourseById: (courseId: string) => apiService.getById('course', courseId),
  createCourse: (courseData: object) => apiService.create('course', courseData),
  updateCourse: (courseId: string, courseData: object) =>
    apiService.update('courses', courseId, courseData),
  deleteCourse: (courseId: string) => apiService.delete('course', courseId),
}
export default courseService
