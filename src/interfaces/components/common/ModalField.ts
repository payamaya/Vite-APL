// Add this export in ReusableModal.tsx
export type ModalField<T> = {
  name: keyof T
  label: string
  type: 'text' | 'number' | 'textarea' | 'date' | 'url'
  required?: boolean
}
