import { addYears } from 'date-fns'
import { ModalField } from '../../../interfaces/components/common/ModalField'
import { ICourse } from '../../../interfaces/components/entities/ICourse'

export const courseFields: ModalField<ICourse>[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  {
    name: 'startDate',
    label: 'Start Date',
    type: 'date',
    required: true,
    minDate: new Date(), // Disable past dates
    maxDate: addYears(new Date(), 1), // Only allow dates within 1 year
  },
  {
    name: 'endDate',
    label: 'End Date',
    type: 'date',
    required: true,
    minDate: new Date(), // Will need to be dynamically set based on startDate in your component
  },
  // Add more fields if needed
]
