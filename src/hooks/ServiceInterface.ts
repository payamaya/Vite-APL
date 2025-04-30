/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiResponse } from '../interfaces/api/ApiResponse'

export interface ServiceInterface<T> {
  create(data: T, ...args: any[]): Promise<ApiResponse<T>>
  update(id: string, data: Partial<T>, ...args: any[]): Promise<ApiResponse<T>>
  getAll?(...args: any[]): Promise<ApiResponse<T[]>>
}
