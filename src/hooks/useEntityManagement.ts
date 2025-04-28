/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useNotification } from '../context/NotificationContext'
import { ApiResponse } from '../interfaces/api/ApiResponse'
import { ServiceInterface } from './ServiceInterface'

interface Options {
  parentId?: string // for modules and activities needing courseId/moduleId
}

export function useEntityManagement<T>(
  service: ServiceInterface<T>,
  initialData: T[] = [],
  options?: Options
) {
  const [entities, setEntities] = useState<T[]>(initialData)
  const [currentEntity, setCurrentEntity] = useState<T | null>(null)
  const { showNotification } = useNotification()

  const handleSubmit = async (formData: T) => {
    try {
      let response: ApiResponse<T>

      if (currentEntity) {
        response = await service.update(
          (currentEntity as any).id,
          { ...currentEntity, ...formData },
          options?.parentId
        )
      } else {
        response = await service.create(formData, options?.parentId)
      }

      if (response.status >= 200 && response.status < 300) {
        setEntities((prev) =>
          currentEntity
            ? prev.map((e) =>
                (e as any).id === (currentEntity as any).id ? response.data : e
              )
            : [response.data, ...prev]
        )

        showNotification({
          message: `${currentEntity ? 'Updated' : 'Created'} successfully!`,
          variant: currentEntity ? 'info' : 'success',
        })
        return true
      }
      throw new Error(
        response.message || `Failed to ${currentEntity ? 'update' : 'create'}`
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
    entities,
    setEntities,
    currentEntity,
    setCurrentEntity,
    handleSubmit,
  }
}
