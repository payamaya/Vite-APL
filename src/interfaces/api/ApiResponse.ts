interface BaseApiResponse {
  message?: string
  token?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> extends BaseApiResponse {
  data: T
  status: number
  statusText: string
  headers?: Record<string, unknown>
}

// Specific type for login response
export interface LoginResponse {
  token: string
  role: string
  expiresAt: string
  sessionId?: string // Optional if you implement session tracking
}
