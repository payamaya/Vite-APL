import { JSX } from 'react'

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'date' | 'checkbox' | 'custom';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalField<T> = {
  name: keyof T
  label: string
  type: FieldType
  placeholder?: string
  minDate?: Date // For 'date'
  maxDate?: Date // For 'date'
  disabledDates?: Date[] // For 'date'
  excludeDates?: Date[] // For 'date'
  customComponent?: JSX.Element // For 'custom'
  required?: boolean
  options?: { label: string; value: string | number }[] // For 'select'
  min?: string
  render?: (props: {
    value: any
    onChange: (value: any) => void
  }) => JSX.Element // For 'custom'
}
