import { useState } from 'react'
import { ApiResponse } from '../interfaces/components/ApiResponse'

type UseFormHandlerReturn<T> = {
  formData: T
  setFormData: React.Dispatch<React.SetStateAction<T>>
  error: string | null
  success: boolean
  isLoading: boolean
  handleSubmit: (e: React.FormEvent) => void
}

export function useFormHandler<T extends { id?: string }>(
  endpoint: string,
  initialData: T,
  createFn: (endpoint: string, data: T) => Promise<ApiResponse<T>>,
  updateFn: (endpoint: string, id: string, data: T) => Promise<ApiResponse<T>>,
  onSuccess?: (response: ApiResponse<T>) => void
): UseFormHandlerReturn<T> {
  const [formData, setFormData] = useState<T>(initialData)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = formData.id
        ? await updateFn(endpoint, formData.id, formData)
        : await createFn(endpoint, formData)

      setSuccess(true)
      setFormData(initialData)
      setTimeout(() => setSuccess(false), 2000)
      if (onSuccess) onSuccess(response)
    } catch (err) {
      console.error('Submit error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return { formData, setFormData, error, success, isLoading, handleSubmit }
}
