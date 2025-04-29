/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { activityService } from '../services'
import { useNotification } from '../context/NotificationContext'
import { IActivity } from '../interfaces/components/entities/IActivity'

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
      setActivities(
        Array.isArray(response.data) ? response.data : [response.data]
      )
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

      if (!moduleId) {
        throw new Error('Module ID is required')
      }

      const payload = {
        ...activityData,
        moduleId, // Ensure moduleId is included
        startDate: activityData.startDate
          ? new Date(activityData.startDate).toISOString()
          : undefined,
        endDate: activityData.endDate
          ? new Date(activityData.endDate).toISOString()
          : undefined,
      }

      let response: any
      if (currentActivity?.id) {
        // Update existing activity
        response = await activityService.updateActivity(
          moduleId,
          currentActivity.id,
          payload
        )
        setActivities(
          activities.map((a) =>
            a.id === currentActivity.id ? response.data : a
          )
        )
        showNotification({
          message: 'Activity updated successfully!',
          variant: 'success',
        })
      } else {
        // Create new activity
        response = await activityService.createActivity(moduleId, payload)
        setActivities([...activities, response.data])
        showNotification({
          message: 'Activity created successfully!',
          variant: 'success',
        })
      }

      return true // Indicate success
    } catch (err) {
      setError('Failed to save activity')
      showNotification({
        message: 'Failed to save activity',
        variant: 'danger',
      })
      console.error('Activity submission error:', err)
      return false
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
