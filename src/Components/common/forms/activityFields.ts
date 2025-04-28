// src/Components/common/forms/activityFields.ts
import { addYears } from 'date-fns'
import { activityTypeOptions } from '../../../interfaces/components/options/activityTypeOptions'
import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IActivity } from '../../../interfaces/components/entities/IActivity'

export const activityFields: ModalField<IActivity>[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    name: 'activityType',
    label: 'Activity Type',
    type: 'select',
    required: true,
    options: activityTypeOptions,
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    required: false,
  },
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
  // {
  //   name: 'endDate',
  //   label: 'End Date',
  //   type: 'date',
  //   required: false,
  //   // Remove the min restriction to allow past dates if needed
  //   // Or set to reasonable minimum if future dates only
  // },
]
