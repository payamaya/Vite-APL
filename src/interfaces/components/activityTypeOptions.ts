import { ActivityType } from './IActivity'

export const activityTypeOptions: { label: string; value: ActivityType }[] = [
  { value: 'assignment', label: 'Assignment' },
  { value: 'quiz', label: 'Quiz' },
  { value: 'polls', label: 'Polls' },
  { value: 'discussion', label: 'Discussion' },
]
