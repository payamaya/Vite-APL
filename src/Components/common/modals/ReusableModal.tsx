import React, { useEffect, useState } from 'react'
import ReusableTextarea from '../inputs/ReusableTextarea'
import ReusableInput from '../inputs/ReusableInput'
import ReusableButton from '../buttons/ReusableButton'
import { ReusableModalProps } from './ReusableModalProps'
import ReusableSelect from '../selects/ReusableSelect'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReusableModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  fields,
}: ReusableModalProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData || ({} as T))
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Initialize form data when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || ({} as T))
    }
  }, [isOpen, initialData])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDateChange = (date: Date | null, name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: date,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name as string] = `${field.label} is required`
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className='modal fade show'
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
            <button
              type='button'
              className='btn-close'
              onClick={onClose}
            ></button>
          </div>
          <div className='modal-body'>
            <form onSubmit={handleSubmit}>
              {fields.map((field) => (
                <div key={field.name as string} className='mb-3'>
                  <label className='form-label'>{field.label}</label>
                  {field.type === 'custom' && field.render ? (
                    field.render({
                      value: formData[field.name] || '',
                      onChange: (value) =>
                        setFormData((prev) => ({
                          ...prev,
                          [field.name]: value as string,
                        })),
                    })
                  ) : field.type === 'textarea' ? (
                    <ReusableTextarea
                      name={field.name as string}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      error={errors[field.name as string]}
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <ReusableSelect
                      // label={field.label}
                      name={field.name as string}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      error={errors[field.name as string]}
                      required={field.required}
                      options={(field.options || []).map((option) => ({
                        ...option,
                        value: String(option.value),
                      }))}
                    />
                  ) : field.type === 'date' ? (
                    <DatePicker
                      selected={
                        formData[field.name]
                          ? new Date(formData[field.name])
                          : null
                      }
                      onChange={(date) =>
                        handleDateChange(date, field.name as string)
                      }
                      minDate={field.minDate}
                      maxDate={field.maxDate}
                      excludeDates={field.disabledDates}
                      className='form-control'
                      dateFormat='MMMM d, yyyy'
                      placeholderText={field.label}
                      required={field.required}
                      showYearDropdown
                      dropdownMode='select'
                    />
                  ) : (
                    <ReusableInput
                      name={field.name as string}
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      error={errors[field.name as string]}
                      required={field.required}
                    />
                  )}
                  {errors[field.name as string] && (
                    <div className='invalid-feedback d-block'>
                      {errors[field.name as string]}
                    </div>
                  )}
                </div>
              ))}

              <div className='modal-footer'>
                <ReusableButton
                  type='button'
                  theme='light'
                  onClick={onClose}
                  label='Cancel'
                />
                <ReusableButton
                  type='submit'
                  theme='dark'
                  label='Save Changes'
                  className='bg-primary'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReusableModal
