import { ModalField } from '../../../interfaces/components/common/ModalField'
import { ICourse } from '../../../interfaces/components/ICourse'

export const courseFields: ModalField<ICourse>[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  // Add more fields if needed
]
