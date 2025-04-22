// src/utils/dateUtils.ts
export const formatDate = (dateInput?: string | Date): string => {
  if (!dateInput) return 'No due date'

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  if (isNaN(date.getTime())) return 'Invalid date'

  return date.toLocaleDateString('en-CA') // Gets yyyy-mm-dd
}
