/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IModule {
  activityDetails: any
  id: string
  name: string
  title: string
  description: string
  courseId: string
  startDate?: string | Date
  endDate?: string | Date
  activityType?: string
  img?: string
}
