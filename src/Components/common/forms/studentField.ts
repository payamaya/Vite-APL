// import { addYears } from 'date-fns'
import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IStudent } from '../../../interfaces/components/entities/IStudent'

export const studentFields: ModalField<IStudent>[] = [
  { name: 'firstName', label: 'First Name', type: 'text', required: true },
  { name: 'lastName', label: 'Last Name', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  { name: 'email', label: 'Eamil', type: 'text', required: true },
  { name: 'telephone', label: 'Telephone', type: 'text', required: true },

  //   name: 'startDate',
  //   label: 'Start Date',
  //   type: 'date',
  //   required: true,
  //   minDate: new Date(), // Disable past dates
  //   maxDate: addYears(new Date(), 1), // Only allow dates within 1 year
  // },
  // {
  //   name: 'endDate',
  //   label: 'End Date',
  //   type: 'date',
  //   required: true,
  //   minDate: new Date(), // Will need to be dynamically set based on startDate in your component
  // },
  // Add more fields if needed
]
