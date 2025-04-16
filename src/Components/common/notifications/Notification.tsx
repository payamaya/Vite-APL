import { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import { NotificationProps } from './NotificationProps'

export const Notification = ({
  message,
  variant,
  onClose,
  duration = 3000,
  children,
}: NotificationProps) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => onClose(), duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <Alert
      variant={variant}
      onClose={onClose}
      dismissible={!!onClose}
      className='position-fixed top-0 end-0 m-3'
      style={{ zIndex: 9999 }}
    >
      {message || children}
    </Alert>
  )
}
