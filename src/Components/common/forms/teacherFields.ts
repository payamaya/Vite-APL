import { ModalField } from '../../../interfaces/components/common/ModalField'
import { ITeacher } from '../../../interfaces/components/entities/ITeacher'
import { teacherTypeProfessionOptions } from '../../../interfaces/components/options/teacherTypeProfession'

export const teacherFields: ModalField<ITeacher>[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  {
    name: 'teacherType',
    label: 'Profession Type',
    type: 'select',
    required: true,
    options: teacherTypeProfessionOptions,
  },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'telephone', label: 'Telephone', type: 'text' },

  { name: 'description', label: 'Description', type: 'textarea' },
]
