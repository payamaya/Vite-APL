// src/services/nestedEntityServiceFactory.ts
import { ApiResponse } from '../interfaces/components/ApiResponse'
import apiService from '../api/apiService'

const createNestedEntityService = <T>(
  parentEndpoint: string,
  childEndpoint: string
) => ({
  getAll(parentId: string): Promise<ApiResponse<T>> {
    if (!parentId) throw new Error(`${parentEndpoint} ID is required`)
    console.log(
      `Fetching all ${childEndpoint}s for ${parentEndpoint} ${parentId}`
    )
    return apiService.getAll<T>(
      `${parentEndpoint}/${parentId}/${childEndpoint}`
    )
  },

  getById(parentId: string, childId: string): Promise<ApiResponse<T>> {
    if (!parentId || !childId) {
      throw new Error(
        `${parentEndpoint} ID and ${childEndpoint} ID are required`
      )
    }
    console.log(
      `Fetching ${childEndpoint} ${childId} from ${parentEndpoint} ${parentId}`
    )
    return apiService.getById<T>(
      `${parentEndpoint}/${parentId}/${childEndpoint}`,
      childId
    )
  },

  async create(parentId: string, data: T): Promise<ApiResponse<T>> {
    try {
      if (!parentId) throw new Error(`${parentEndpoint} ID is required`)
      console.log(
        `Creating ${childEndpoint} for ${parentEndpoint} ${parentId} with data:`,
        data
      )
      const response = await apiService.create<T, T>(
        `${parentEndpoint}/${parentId}/${childEndpoint}`,
        data
      )
      console.log(`${childEndpoint} created successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error creating ${childEndpoint}:`, error)
      throw error
    }
  },

  async update(
    parentId: string,
    childId: string,
    data: T
  ): Promise<ApiResponse<T>> {
    try {
      if (!parentId || !childId) {
        throw new Error(
          `${parentEndpoint} ID and ${childEndpoint} ID are required for update`
        )
      }
      console.log(
        `Updating ${childEndpoint} ${childId} in ${parentEndpoint} ${parentId} with:`,
        data
      )
      const response = await apiService.update<T, T>(
        `${parentEndpoint}/${parentId}/${childEndpoint}`,
        childId,
        data
      )
      console.log(`${childEndpoint} updated successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error updating ${childEndpoint} ${childId}:`, error)
      throw error
    }
  },

  async delete(parentId: string, childId: string): Promise<ApiResponse<T>> {
    try {
      if (!parentId || !childId) {
        throw new Error(
          `${parentEndpoint} ID and ${childEndpoint} ID are required for deletion`
        )
      }
      console.log(
        `Deleting ${childEndpoint} ${childId} from ${parentEndpoint} ${parentId}`
      )
      const response = await apiService.delete<T>(
        `${parentEndpoint}/${parentId}/${childEndpoint}`,
        childId
      )
      console.log(`${childEndpoint} deleted successfully:`, response)
      return response
    } catch (error) {
      console.error(`Error deleting ${childEndpoint} ${childId}:`, error)
      throw error
    }
  },
})

export default createNestedEntityService
