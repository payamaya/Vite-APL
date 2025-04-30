import createEntityService from './entityServiceFactory'
import { ITeacher } from '../interfaces/components/entities'

const teachersService = createEntityService<ITeacher>('teacher')

export const teacherService = {
  getAllTeachers: teachersService.getAll,
  getTeacherById: teachersService.getById,
  createTeacher: teachersService.create,
  updateTeacher: teachersService.update,
  deleteTeacher: teachersService.delete,
}
