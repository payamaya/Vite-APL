import { JSX } from 'react'

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'date'
  | 'checkbox'
  | 'custom'

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
    value: unknown
    onChange: (value: unknown) => void
    field: ModalField<T>
  }) => JSX.Element
} & (
  | {
      type: 'select'
      options: { label: string; value: string | number }[]
    }
  | {
      type: 'date'
      minDate?: Date
      maxDate?: Date
      disabledDates?: Date[]
      excludeDates?: Date[]
    }
  | {
      type: 'custom'
      render: (props: {
        value: unknown
        onChange: (value: unknown) => void
        field: ModalField<T>
      }) => JSX.Element
    }
  | {
      type: Exclude<FieldType, 'select' | 'date' | 'custom'>
    }
)
