import { useState } from 'react'
import { ApiResponse } from '../interfaces/api/ApiResponse'
import { IUser } from '../interfaces/components/entities/IUser'
import { useNotification } from '../context/NotificationContext'
import { registerService } from '../services/registerService'

export const useUserManagement = (
  initialUsers: IUser[] = [],
  userRole?: string
) => {
  const [users, setUsers] = useState<IUser[]>(initialUsers)
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)
  const { showNotification } = useNotification()

  const handleSubmit = async (formData: IUser) => {
    try {
      let response: ApiResponse<IUser>

      if (currentUser) {
        response = await registerService.updateRegister(currentUser.id, {
          ...currentUser,
          ...formData,
        })
      } else {
        response = await registerService.createRegister(formData)
      }

      if (response.status >= 200 && response.status < 300) {
        setUsers((prev) =>
          currentUser
            ? prev.map((u) => (u.id === currentUser.id ? response.data : u))
            : [response.data, ...prev]
        )
        showNotification({
          message: `User ${currentUser ? 'updated' : 'created'} successfully!`,
          variant: currentUser ? 'info' : 'success',
        })
        return true
      }

      throw new Error(response.data?.message || 'Request failed')
    } catch (err) {
      showNotification({
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'danger',
      })
      return false
    }
  }

  const filteredUsers = userRole
    ? users.filter((user) => user.role === userRole)
    : users

  return {
    users: filteredUsers,
    setUsers,
    currentUser,
    setCurrentUser,
    handleSubmit,
  }
}
