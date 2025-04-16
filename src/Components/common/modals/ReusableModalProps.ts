export interface ReusableModalProps<T> {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: T) => void
  initialData?: T
  title: string
  fields: Array<{
    name: keyof T
    label: string
    type: 'text' | 'number' | 'textarea' | 'date' | 'url'
    required?: boolean
  }>
}
