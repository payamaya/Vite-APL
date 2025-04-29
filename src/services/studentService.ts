import createEntityService from './entityServiceFactory'
import { IStudent } from '../interfaces/components/entities/IStudent'

const studentsService = createEntityService<IStudent>('student')

export const studentService = {
  getAllStudents: studentsService.getAll,
  getStudentById: studentsService.getById,
  createStudent: studentsService.create,
  updateStudent: studentsService.update,
  deleteStudent: studentsService.delete,
}
