import { useState } from 'react'
import { ApiResponse } from '../interfaces/api/ApiResponse'
import { ICourse } from '../interfaces/components/entities/ICourse'
import courseService from '../services/coursesService'
import { useNotification } from '../context/NotificationContext'

export const useCourseManagement = (initialCourses: ICourse[] = []) => {
  const [courses, setCourses] = useState<ICourse[]>(initialCourses)
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null)
  const { showNotification } = useNotification()

  const handleSubmit = async (formData: ICourse) => {
    try {
      let response: ApiResponse<ICourse>

      if (currentCourse) {
        response = await courseService.updateCourse(currentCourse.id, {
          ...currentCourse,
          ...formData,
        })
      } else {
        response = await courseService.createCourse(formData)
      }

      if (response.status >= 200 && response.status < 300) {
        setCourses((prev) =>
          currentCourse
            ? prev.map((c) => (c.id === currentCourse.id ? response.data : c))
            : [response.data, ...prev]
        )
        showNotification({
          message: `Course ${currentCourse ? 'updated' : 'created'} successfully!`,
          variant: currentCourse ? 'info' : 'success',
        })
        return true
      }
      throw new Error(
        response.data?.message ||
          `Failed to ${currentCourse ? 'update' : 'create'} course`
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
    courses,
    setCourses,
    currentCourse,
    setCurrentCourse,
    handleSubmit,
  }
}
