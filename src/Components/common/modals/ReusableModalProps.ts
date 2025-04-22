import { ModalField } from '../../../interfaces/components/common/ModalField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ReusableModalProps<T extends Record<string, any>> {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: T) => void
  initialData?: T
  title: string
  fields: ModalField<T>[] // <-- This is the key fix
}
