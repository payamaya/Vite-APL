import { useState } from 'react'
import { ApiResponse } from '../interfaces/api/ApiResponse'

import { studentService } from '../services'
import { useNotification } from '../context/NotificationContext'
import { IStudent } from '../interfaces/components/entities'

export const useStudentManagement = (initialStudents: IStudent[] = []) => {
  const [students, setStudents] = useState<IStudent[]>(initialStudents)
  const [currentStudent, setCurrentStudent] = useState<IStudent | null>(null)
  const { showNotification } = useNotification()

  const handleSubmit = async (formData: IStudent) => {
    try {
      let response: ApiResponse<IStudent>

      if (currentStudent) {
        response = await studentService.updateStudent(currentStudent.id, {
          ...currentStudent,
          ...formData,
        })
      } else {
        response = await studentService.createStudent(formData)
      }

      if (response.status >= 200 && response.status < 300) {
        setStudents((prev) =>
          currentStudent
            ? prev.map((c) => (c.id === currentStudent.id ? response.data : c))
            : [response.data, ...prev]
        )
        showNotification({
          message: `Student ${currentStudent ? 'updated' : 'created'} successfully!`,
          variant: currentStudent ? 'info' : 'success',
        })
        return true
      }
      throw new Error(
        response.message ||
          `Failed to ${currentStudent ? 'update' : 'create'} student`
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
    students,
    setStudents,
    currentStudent,
    setCurrentStudent,
    handleSubmit,
  }
}
