// useModuleManagement.ts
import { useState } from 'react'
import { ApiResponse } from '../interfaces/api/ApiResponse'
import { IModule } from '../interfaces/components/entities'
import { moduleService } from '../services'
import { useNotification } from '../context/NotificationContext'

export const useModuleManagement = (
  courseId: string,
  initialModules: IModule[] = []
) => {
  const [modules, setModules] = useState<IModule[]>(initialModules)
  const [currentModule, setCurrentModule] = useState<IModule | null>(null)
  const { showNotification } = useNotification()

  const handleSubmitModule = async (formData: IModule) => {
    try {
      if (!courseId) throw new Error('Course ID is required')

      let response: ApiResponse<IModule>

      if (currentModule) {
        response = await moduleService.updateModule(
          courseId,
          currentModule.id,
          { ...currentModule, ...formData }
        )
      } else {
        response = await moduleService.createModule(courseId, formData)
      }

      if (response.status >= 200 && response.status < 300) {
        setModules((prev) =>
          currentModule
            ? prev.map((m) => (m.id === currentModule.id ? response.data : m))
            : [response.data, ...prev]
        )
        showNotification({
          message: `Module ${currentModule ? 'updated' : 'created'} successfully!`,
          variant: currentModule ? 'info' : 'success',
        })
        return true
      }
      throw new Error(`${response.data?.id} || 'Operation failed'`)
    } catch (err) {
      showNotification({
        message: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        variant: 'danger',
      })
      return false
    }
  }

  return {
    modules,
    setModules,
    currentModule,
    setCurrentModule,
    handleSubmitModule,
  }
}
