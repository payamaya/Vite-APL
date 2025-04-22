import { JSX } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalField<T> = {
  name: keyof T
  label: string
  type: 'text' | 'number' | 'textarea' | 'date' | 'url' | 'select' | 'custom'
  required?: boolean
  options?: { label: string; value: string | number }[] // For 'select'
  min?: string
  render?: (props: {
    value: any
    onChange: (value: any) => void
  }) => JSX.Element // For 'custom'
}
