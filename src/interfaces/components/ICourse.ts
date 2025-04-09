import { ReactNode } from 'react'

export interface ICourse {
  startDate: ReactNode
  endDate: ReactNode
  id: string
  name: string
  title: string
  description: string
  img?: string
}
