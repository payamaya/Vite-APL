/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useActivityManagement.ts
import { useState } from 'react'
import activityService from '../services/activityService'
import { useNotification } from '../context/NotificationContext'
import { IActivity } from '../interfaces/components/IActivity'

export const useActivityManagement = (moduleId: string) => {
  const [activities, setActivities] = useState<IActivity[]>([])
  const [currentActivity, setCurrentActivity] = useState<IActivity | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { showNotification } = useNotification()

  const fetchActivities = async () => {
    try {
      setLoading(true)
      setError('')
      const response =
        await activityService.getAllActivities<IActivity[]>(moduleId)
      setActivities(response.data)
    } catch (err) {
      setError('Failed to fetch activities')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // src/hooks/useActivityManagement.ts
  const handleSubmitActivity = async (activityData: IActivity) => {
    try {
      setLoading(true)
      setError('')

      // Prepare payload with proper date handling
      const payload = {
        ...activityData,
        dueDate: activityData.dueDate
          ? new Date(activityData.dueDate).toISOString()
          : undefined,
        // Ensure assignments have due dates
        ...(activityData.activityType === 'assignment' && !activityData.dueDate
          ? { dueDate: new Date().toISOString() }
          : {}),
      }

      let response: any
      if (currentActivity?.id) {
        response = await activityService.updateActivity<IActivity>(
          moduleId,
          currentActivity.id,
          payload
        )
        showNotification({
          message: 'Activity updated successfully!',
          variant: 'success',
        })
        // Update state
      } else {
        response = await activityService.createActivity<IActivity>(
          moduleId,
          payload
        )
        // Update state
      }
    } catch (err) {
      // Error handling
    } finally {
      setLoading(false)
    }
  }

  return {
    activities,
    setActivities,
    currentActivity,
    setCurrentActivity,
    loading,
    error,
    fetchActivities,
    handleSubmitActivity,
  }
}

export default useActivityManagement
