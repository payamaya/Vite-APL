import createEntityService from './entityServiceFactory'
import { ICourse } from '../interfaces/components/ICourse'

const baseService = createEntityService<ICourse>('course')

export default {
  getAllCourses: baseService.getAll,
  getCourseById: baseService.getById,
  createCourse: baseService.create,
  updateCourse: baseService.update,
  deleteCourse: baseService.delete,
}
