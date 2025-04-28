import apiService from '../api/apiService'
import { ApiResponse } from '../interfaces/components/ApiResponse'

const createEntityService = <T>(baseEndpoint: string) => ({
  getAll(): Promise<ApiResponse<T>> {
    console.log(`Fetching all ${baseEndpoint}s`)
    return apiService.getAll<T>(baseEndpoint)
  },
  getById(id: string): Promise<ApiResponse<T>> {
    if (!id) throw new Error(`${baseEndpoint} ID is required`)
    console.log(`Fetching ${baseEndpoint} with ID: ${id}`)
    return apiService.getById<T>(baseEndpoint, id)
  },
  async create(data: T): Promise<ApiResponse<T>> {
    try {
      console.log(`Creating ${baseEndpoint} with data:`, data)
      const response = await apiService.create<T, T>(baseEndpoint, data)
      console.log(`${baseEndpoint} created successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error creating ${baseEndpoint}:`, error)
      throw error
    }
  },
  async update(id: string, data: T): Promise<ApiResponse<T>> {
    try {
      if (!id) throw new Error(`${baseEndpoint} ID is required for update`)
      console.log(`Updating ${baseEndpoint} ${id} with:`, data)
      const response = await apiService.update<T, T>(baseEndpoint, id, data)
      console.log(`${baseEndpoint} updated successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error updating ${baseEndpoint} ${id}:`, error)
      throw error
    }
  },

  async delete(id: string): Promise<ApiResponse<T>> {
    try {
      if (!id) throw new Error(`${baseEndpoint} ID is required for deletion`)
      console.log(`Deleting ${baseEndpoint} with ID: ${id}`)
      const response = await apiService.delete<T>(baseEndpoint, id)
      console.log(`${baseEndpoint} deleted successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error deleting ${baseEndpoint} ${id}:`, error)
      throw error
    }
  },
})

export default createEntityService
