// context/NotificationContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react'
import { Notification } from '../Components/common/notifications/Notification'

type NotificationType = {
  message: string
  variant: 'success' | 'danger' | 'warning' | 'info'
}

interface NotificationContextType {
  showNotification: (notification: NotificationType) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

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

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}
