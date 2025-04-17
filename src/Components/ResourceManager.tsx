import { ReactNode } from 'react'
import ReusableModal from './common/modals/ReusableModal'
import { ModalField } from '../interfaces/components/common/ModalField'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResourceManagerProps<T extends Record<string, any>> {
  fields: ModalField<T>[]
  initialData?: T
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: T) => Promise<void>
  title: string
  children?: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResourceManager = <T extends Record<string, any>>({
  fields,
  initialData,
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
}: ResourceManagerProps<T>) => (
  <>
    {children}
    <ReusableModal<T>
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      initialData={initialData}
      title={title}
      fields={fields}
    />
  </>
)
