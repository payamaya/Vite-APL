// interfaces/components/common/inputTypes.ts
import React from 'react'

export interface BaseFieldProps {
  label?: string
  name: string
  value: string
  placeholder?: string
  error?: string
  required?: boolean
  autoFocus?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
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
