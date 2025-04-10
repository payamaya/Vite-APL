import { useState } from 'react'
import ReusableInput from '../inputs/ReusableInput'
import ReusableButton from '../buttons/ReusableButton'
import apiService from '../../../api/apiService'
import { ReusableFormProps } from '../../../interfaces/components/common/ReusableFormProps'
import { IFormData } from '../../../interfaces/components/IFormData'
import { ApiResponse } from '../../../interfaces/components/ApiResponse'

const ReusableForm = ({
  endpoint,
  initialData,
  onSuccess,
  onCancel,
}: ReusableFormProps) => {
  const [formData, setFormData] = useState<IFormData>(
    initialData || { name: '', title: '', description: '' }
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      let response: ApiResponse<IFormData>

      if (formData.id) {
        response = await apiService.update<IFormData>(
          endpoint,
          formData.id,
          formData
        )
      } else {
        response = await apiService.create<IFormData>(endpoint, formData)
      }

      setSuccess(true)
      setFormData({ name: '', title: '', description: '' })
      setTimeout(() => setSuccess(false), 2000)
      if (onSuccess) {
        onSuccess(response) // Use only the relevant `data`
      }
    } catch (error) {
      console.error('Failed to send data:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='container bg-primary mt-4 p-4 border rounded'>
      <form onSubmit={handleSubmit}>
        <ReusableInput
          label='Name'
          name='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          required
        />
        <ReusableInput
          label='Title'
          name='title'
          type='text'
          value={formData.title}
          onChange={handleChange}
          required
        />
        <ReusableInput
          label='Description'
          name='description'
          type='text'
          value={formData.description}
          onChange={handleChange}
          required
        />

        {error && <div className='alert alert-danger'>{error}</div>}
        {success && (
          <div className='alert alert-success'>
            Operation completed successfully!
          </div>
        )}

        <div className='d-flex gap-2 mt-3'>
          <ReusableButton
            type='submit'
            disabled={isLoading}
            loading={isLoading}
            theme='light'
            className='bg-warning'
          >
            {formData.id ? 'Update' : 'Submit'}
          </ReusableButton>

          {onCancel && (
            <ReusableButton
              type='button'
              onClick={onCancel}
              theme='light'
              className='bg-secondary'
            >
              Cancel
            </ReusableButton>
          )}
        </div>
      </form>
    </section>
  )
}

export default ReusableForm
