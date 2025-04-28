import { useState } from 'react'
import { ApiResponse } from '../interfaces/api/ApiResponse'

import teacherService from '../services/teacherService'
import { useNotification } from '../context/NotificationContext'
import { ITeacher } from '../interfaces/components/entities/ITeacher'

export const useTeacherManagement = (initialTeachers: ITeacher[] = []) => {
  const [teachers, setTeachers] = useState<ITeacher[]>(initialTeachers)
  const [currentTeacher, setCurrentTeacher] = useState<ITeacher | null>(null)
  const { showNotification } = useNotification()

  const handleSubmit = async (formData: ITeacher) => {
    try {
      let response: ApiResponse<ITeacher>

      if (currentTeacher) {
        response = await teacherService.updateTeacher(currentTeacher.id, {
          ...currentTeacher,
          ...formData,
        })
      } else {
        response = await teacherService.createTeacher(formData)
      }

      if (response.status >= 200 && response.status < 300) {
        setTeachers((prev) =>
          currentTeacher
            ? prev.map((c) => (c.id === currentTeacher.id ? response.data : c))
            : [response.data, ...prev]
        )
        showNotification({
          message: `Teacher ${currentTeacher ? 'updated' : 'created'} successfully!`,
          variant: currentTeacher ? 'info' : 'success',
        })
        return true
      }
      throw new Error(
        response.data?.message ||
          `Failed to ${currentTeacher ? 'update' : 'create'} teacher`
      )
    } catch (err) {
      showNotification({
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'danger',
      })
      return false
    }
  }

  return {
    teachers,
    setTeachers,
    currentTeacher,
    setCurrentTeacher,
    handleSubmit,
  }
}
