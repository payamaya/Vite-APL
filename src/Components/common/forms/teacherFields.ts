import { ModalField } from '../../../interfaces/components/common/ModalField'
import { ITeacher } from '../../../interfaces/components/ITeacher'
import { teacherTypeProfession } from '../../../interfaces/components/teacherTypeProfession'

export const teacherFields: ModalField<ITeacher>[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  {
      name: 'teacherType',
      label: 'Profession Type',
      type: 'select',
      required: true,
      options: teacherTypeProfession,
    },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'telephone', label: 'Telephone', type: 'text' },
  // Add more fields if needed
]
