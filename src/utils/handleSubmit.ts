// import { ApiResponse } from '../interfaces/components/ApiResponse'

// export const handleSubmit = async <T>(
//   e: React.FormEvent,
//   formData: T,
//   endpoint: string,
//   setFormData: React.Dispatch<React.SetStateAction<T>>,
//   createFn: (endpoint: string, data: T) => Promise<ApiResponse<T>>,
//   updateFn: (endpoint: string, id: string, data: T) => Promise<ApiResponse<T>>,
//   setError: React.Dispatch<React.SetStateAction<string | null>>,
//   setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
//   onSuccess?: (response: ApiResponse<T>) => void
// ) => {
//   e.preventDefault()
//   setIsLoading(true)
//   setError(null)
//   setSuccess(false)

//   try {
//     let response: ApiResponse<T>

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     if ((formData as any).id) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       response = await updateFn(endpoint, (formData as any).id, formData)
//     } else {
//       response = await createFn(endpoint, formData)
//     }

//     setSuccess(true)
//     setFormData({} as T)
//     setTimeout(() => setSuccess(false), 2000)

//     if (onSuccess) onSuccess(response)
//   } catch (error) {
//     console.error('Form submit error:', error)
//     setError(error instanceof Error ? error.message : 'An error occurred')
//   } finally {
//     setIsLoading(false)
//   }
// }
