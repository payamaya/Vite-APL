import createEntityService from './entityServiceFactory'
import { ITeacher } from '../interfaces/components/ITeacher'

const baseService = createEntityService<ITeacher>('teacher')

export default {
  getAllTeachers: baseService.getAll,
  getTeacherById: baseService.getById,
  createTeacher: baseService.create,
  updateTeacher: baseService.update,
  deleteTeacher: baseService.delete,
}
