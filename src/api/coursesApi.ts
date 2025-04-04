import apiService from './apiService'

const courseService = {
  getAllCourses: () => apiService.getAll('courses'),
  getCourseById: (courseId: string) => apiService.getById('courses', courseId),
  createCourse: (courseData: object) =>
    apiService.create('courses', courseData),
  updateCourse: (courseId: string, courseData: object) =>
    apiService.update('courses', courseId, courseData),
  deleteCourse: (courseId: string) => apiService.delete('courses', courseId),
}
export default courseService
