// src/hooks/useAuth.ts
import { useState } from 'react'
import authService from '../api/authService'
import { UserRole } from '../types'

export function useAuth() {
  const [user, setUser] = useState<UserRole | null>(authService.getUserRole())
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await authService.login({ email, password })
      setUser(authService.getUserRole())
      setError(null)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
      return false
    }
  }

  const logout = (): void => {
    authService.logout()
    setUser(null)
  }

  return { user, error, login, logout }
}
