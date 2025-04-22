// src/interfaces/components/IActivity.ts
export type ActivityType = 'assignment' | 'quiz' | 'polls' | 'discussion'

export interface IActivity {
  id: string
  moduleId?: string
  title: string
  description: string
  activityType: ActivityType
  content?: string
  dueDate?: string | Date // Can be string or Date object
  // endDate?: string | Date // Can be string or Date object
  createdAt?: string
}
