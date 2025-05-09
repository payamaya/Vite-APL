import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IUser } from '../../../interfaces/components/entities'
import { userRoleOptions } from '../../../interfaces/components/entities/userRoleOptions'

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
  {
    name: 'role',
    label: 'System Role',
    type: 'select',
    required: true,
    options: userRoleOptions,
  },
]
