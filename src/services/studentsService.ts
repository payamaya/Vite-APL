import createEntityService from './entityServiceFactory'
import { IStudent } from '../interfaces/components/IStudent'

const baseService = createEntityService<IStudent>('student')

export default {
  getAllStudents: baseService.getAll,
  getStudentById: baseService.getById,
  createStudent: baseService.create,
  updateStudent: baseService.update,
  deleteStudent: baseService.delete,
}
