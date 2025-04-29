import { IModule } from '../interfaces/components/entities/IModule'
import createNestedEntityService from './nestedEntityServiceFactory'

const modulesService = createNestedEntityService<IModule>('course', 'module')

export const moduleService = {
  getAllModules: modulesService.getAll,
  getModuleById: modulesService.getById,
  createModule: modulesService.create,
  updateModule: modulesService.update,
  deleteModule: modulesService.delete,
}
