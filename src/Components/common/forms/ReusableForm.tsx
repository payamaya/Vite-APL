import { useFormHandler } from '../../../hooks/useFormHandler'
import ReusableInput from '../inputs/ReusableInput'
import ReusableButton from '../buttons/ReusableButton'
import apiService from '../../../api/apiService'
import { ReusableFormProps } from '../../../interfaces/components/common/ReusableFormProps'
import { IFormData } from '../../../interfaces/components/IFormData'

const ReusableForm = ({
  endpoint,
  initialData,
  onSuccess,
  onCancel,
}: ReusableFormProps) => {
  const { formData, setFormData, error, success, isLoading, handleSubmit } =
    // ✅ Use custom useFormHandler hook
    useFormHandler<IFormData>(
      endpoint,
      initialData || { name: '', title: '', description: '' },
      apiService.create,
      apiService.update,
      onSuccess
    )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
