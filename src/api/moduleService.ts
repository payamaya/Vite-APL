import apiService from './apiService'

const moduleService = {
  getAllModule: () => apiService.getAll('modules'),
  getModuleById: (moduleId: string) => apiService.getById('modules', moduleId),
  createModule: (moduleData: object) =>
    apiService.create('modules', moduleData),
  updateModule: (moduleId: string, moduleData: object) =>
    apiService.update('modules', moduleId, moduleData),
  deleteModule: (moduleId: string) => apiService.delete('modules', moduleId),
}
export default moduleService
