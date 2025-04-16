import { ReactNode } from 'react'

export interface NotificationProps {
  message?: ReactNode // Changed to ReactNode and made optional
  variant: 'success' | 'danger' | 'warning' | 'info'
  onClose?: () => void
  duration?: number
  children?: ReactNode
}
