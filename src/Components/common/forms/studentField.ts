// import { addYears } from 'date-fns'
import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IStudent } from '../../../interfaces/components/entities/IStudent'

export const studentFields: ModalField<IStudent>[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'email', label: 'Eamil', type: 'text', required: true },
  { name: 'telephone', label: 'Telephone', type: 'text', required: true },
]
