import { createContext } from 'react'
import { NotificationContextType } from './NotificationContext'

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined)
