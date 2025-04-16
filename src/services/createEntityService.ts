import apiService from '../api/apiService'

const createEntityService = <T>(baseEndpoint: string) => ({
  getAll: () => apiService.getAll<T>(baseEndpoint),
  getById: (id: string) => apiService.getById<T>(baseEndpoint, id),
  create: (data: T) => apiService.create<T, T>(baseEndpoint, data),
  update: (id: string, data: T) =>
    apiService.update<T, T>(baseEndpoint, id, data),
  delete: (id: string) => apiService.delete<T>(baseEndpoint, id),
})

export default createEntityService
