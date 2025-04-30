import { ApiResponse } from '../interfaces/api/ApiResponse'

export interface IEntityService<T> {
  getAll(): Promise<ApiResponse<T>>
  getById(id: string): Promise<ApiResponse<T>>
  create(data: T): Promise<ApiResponse<T>>
  update(id: string, data: T): Promise<ApiResponse<T>>
  delete(id: string): Promise<ApiResponse<T>>
}
