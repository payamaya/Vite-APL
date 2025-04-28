import { IModule } from '../interfaces/components/IModule'
import createNestedEntityService from './nestedEntityServiceFactory'

const baseService = createNestedEntityService<IModule>('course', 'module')

export default {
  getAllModules: baseService.getAll,
  getModuleById: baseService.getById,
  createModule: baseService.create,
  updateModule: baseService.update,
  deleteModule: baseService.delete,
}
