import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IUser } from '../../../interfaces/components/entities/IUser'
import { userTypeProfessionOptions } from '../../../interfaces/components/options/userTypeRole'

export const userFields: ModalField<IUser>[] = [
  { name: 'firstName', label: 'FirstName', type: 'text' },
  { name: 'lastName', label: 'LastName', type: 'text' },
  { name: 'telephone', label: 'Telephone', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
  { name: 'email', label: 'Email', type: 'text', required: true },
  {
    name: 'userType',
    label: 'Role Type',
    type: 'select',
    required: true,
    options: userTypeProfessionOptions,
  },
]
