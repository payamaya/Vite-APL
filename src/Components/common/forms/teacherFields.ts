import { ModalField } from '../../../interfaces/components/common/ModalField'
import { ITeacher } from '../../../interfaces/components/entities/ITeacher'
import { teacherTypeProfessionOptions } from '../../../interfaces/components/options/teacherTypeProfession'

export const teacherFields: ModalField<ITeacher>[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'telephone', label: 'Telephone', type: 'text' },
  {
    name: 'teacherType',
    label: 'Profession Type',
    type: 'select',
    required: true,
    options: teacherTypeProfessionOptions,
  },
]
