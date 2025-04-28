// src/interfaces/components/IFormField.ts
export interface FormFieldOption {
  value: string
  label: string
}

export interface FormField {
  name: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'date' | 'richtext'
  required: boolean
  placeholder?: string
  options?: FormFieldOption[] // only for 'select'
}
