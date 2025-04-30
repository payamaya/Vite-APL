import createEntityService from './entityServiceFactory'
import { ICourse } from '../interfaces/components/entities'

const coursesService = createEntityService<ICourse>('course')

export const courseService = {
  getAllCourses: coursesService.getAll,
  getCourseById: coursesService.getById,
  createCourse: coursesService.create,
  updateCourse: coursesService.update,
  deleteCourse: coursesService.delete,
}
