/**
 * Props for the ReusableForm component
 * @property {string} endpoint - The API endpoint to submit to
 * @property {IFormData} [initialData] - Initial form values for edit mode
 * @property {(responseData: any) => void} [onSuccess] - Callback after successful submission
 * @property {() => void} [onCancel] - Callback for cancel action
 */
import { ApiResponse } from '../../../interfaces/components/ApiResponse'
import { IFormData } from '../../../interfaces/components/IFormData'
export interface ReusableFormProps {
  endpoint: string
  initialData?: IFormData // For edit functionality
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (responseData: ApiResponse<IFormData>) => void
  onCancel?: () => void // Optional cancel callback
}
