// src/Components/common/forms/activityFields.ts
import { activityTypeOptions } from '../../../interfaces/components/activityTypeOptions'
import { ModalField } from '../../../interfaces/components/common/ModalField'
import { IActivity } from '../../../interfaces/components/IActivity'

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
    name: 'dueDate',
    label: 'Start Date',
    type: 'date',
    required: false,
    // Remove the min restriction to allow past dates if needed
    // Or set to reasonable minimum if future dates only
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
