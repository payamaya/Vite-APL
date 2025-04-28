import { ApiResponse } from '../interfaces/components/ApiResponse'

export interface ServiceInterface<T> {
  getAll(): Promise<ApiResponse<T[]>>
  getById(id: string): Promise<ApiResponse<T>>
  create(data: T): Promise<ApiResponse<T>>
  update(id: string, data: T): Promise<ApiResponse<T>>
  delete(id: string): Promise<ApiResponse<T>>
}
