// context/NotificationContext.tsx
import { useState, ReactNode } from 'react'
import { Notification } from '../Components/common/notifications/Notification'
import { NotificationContext } from './NotificationContext.1'

type NotificationType = {
  message: string
  variant: 'success' | 'danger' | 'warning' | 'info'
}

export interface NotificationContextType {
  showNotification: (notification: NotificationType) => void
}

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  )

  const showNotification = ({ message, variant }: NotificationType) => {
    setNotification({ message, variant })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          variant={notification.variant}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  )
}
