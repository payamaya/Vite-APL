// src/interfaces/components/common/ModalField.ts
export type ModalField<T> = {
  name: keyof T
  label: string
  type: 'text' | 'number' | 'textarea' | 'date' | 'url' | 'select' // Added 'select'
  required?: boolean
  options?: { label: string; value: string }[] // Options for select fields
  min?: string
}
