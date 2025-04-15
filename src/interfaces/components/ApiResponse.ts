// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers?: Record<string, unknown>
  // headers?: AxiosResponseHeaders
  message: string // Optional custom message
}
