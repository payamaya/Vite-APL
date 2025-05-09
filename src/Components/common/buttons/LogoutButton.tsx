import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableButton from './ReusableButton'
import { useAuth } from '../../../context/AuthContext'
import authService from '../../../api/authService'
import { BaseButtonProps } from '../../../interfaces/base/BaseButtonProps'

interface LogoutButtonProps extends Partial<BaseButtonProps> {
  redirectPath?: string
  confirmBeforeLogout?: boolean
  confirmationText?: string
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

const LogoutButton: React.FC<LogoutButtonProps> = ({
  redirectPath = '/login',
  confirmBeforeLogout = true,
  confirmationText = 'Are you sure you want to logout?',
  onSuccess,
  onError,
  ...buttonProps
}) => {
  const navigate = useNavigate()
  const { setAuthenticated, sessionId } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (confirmBeforeLogout && !window.confirm(confirmationText)) {
      return
    }

    setIsLoggingOut(true)
    try {
      await authService.logout(sessionId)
      setAuthenticated(false, null)
      navigate(redirectPath)
      onSuccess?.()
    } catch (error) {
      console.error('Logout failed:', error)
      onError?.(error instanceof Error ? error : new Error('Logout failed'))
      // TODO for future can create a network util
      // if (isNetworkError(error)) {
      //   setTimeout(handleLogout, 2000) // Retry after 2 seconds
      // }
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <ReusableButton
      onClick={handleLogout}
      label='Logout'
      type='button'
      disabled={isLoggingOut}
      loading={isLoggingOut}
      aria-busy={isLoggingOut}
      aria-label='Logout button'
      {...buttonProps}
    />
  )
}

export default LogoutButton
