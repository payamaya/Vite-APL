import { ReactNode } from 'react'

export interface NotificationProps {
  message?: ReactNode
  variant: 'success' | 'danger' | 'warning' | 'info'
  onClose?: () => void
  duration?: number
  children?: ReactNode
}
