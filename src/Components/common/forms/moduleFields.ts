import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IModule } from '../../../interfaces/components/entities/IModule'

export const moduleFields: ModalField<IModule>[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
]
