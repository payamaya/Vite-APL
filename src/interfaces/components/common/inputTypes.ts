export interface BaseFieldProps {
  label?: string
  name: string
  value: string
  placeholder?: string
  error?: string
  required?: boolean
  autoFocus?: boolean
  [key: string]: unknown
}
export interface FieldConfig {
  componentType: 'input' | 'textarea'
  defaultRows?: number
}
export interface InputFieldProps extends BaseFieldProps {
  type?: React.HTMLInputTypeAttribute
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

export interface TextareaFieldProps extends BaseFieldProps {
  rows?: number
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void
}
