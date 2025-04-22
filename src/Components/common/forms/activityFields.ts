// src/Components/common/forms/activityFields.ts
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
    options: [
      { value: 'lecture', label: 'Lecture' },
      { value: 'exercise', label: 'Exercise' },
      { value: 'assignment', label: 'Assignment' },
      { value: 'quiz', label: 'Quiz' },
    ],
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
