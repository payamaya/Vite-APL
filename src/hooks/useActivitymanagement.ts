/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
      const response = await activityService.getAllActivities(moduleId)
      setActivities(response.data as unknown as IActivity[])
    } catch (err) {
      setError('Failed to fetch activities')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitActivity = async (activityData: IActivity) => {
    try {
      setLoading(true)
      setError('')

      // Prepare payload with proper date handling
      const payload = {
        ...activityData,
        dueDate: activityData.startDate
          ? new Date(activityData.startDate).toISOString()
          : undefined,
        // Ensure assignments have due dates
        ...(activityData.activityType === 'assignment' &&
        !activityData.startDate
          ? { dueDate: new Date().toISOString() }
          : {}),
      }

      let response: any
      if (currentActivity?.id) {
        response = await activityService.updateActivity(
          moduleId,
          currentActivity.id,
          payload
        )
        showNotification({
          message: 'Activity updated successfully!',
          variant: 'success',
        })
      } else {
        response = await activityService.createActivity(moduleId, payload)
      }
    } catch (err) {
      console.error(`${err}: Error: manage activity`)
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
