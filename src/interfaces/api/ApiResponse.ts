interface BaseApiResponse {
  message?: string
  token?: string
}

export interface ApiResponse<T = unknown> extends BaseApiResponse {
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
