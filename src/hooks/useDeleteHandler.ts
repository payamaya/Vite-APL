// Updated useDeleteHandler hook
import { useState } from 'react'

type UseDeleteHandlerReturn = {
  deletingId: string | null
  error: string | null
  deleteItem: (id: string, confirmMessage?: string) => Promise<boolean>
}

export function useDeleteHandler<T extends { id: string }>(
  deleteFn: (id: string) => Promise<unknown>,
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  list: T[]
): UseDeleteHandlerReturn {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const deleteItem = async (
    id: string,
    confirmMessage = 'Are you sure you want to delete this item?'
  ): Promise<boolean> => {
    if (!window.confirm(confirmMessage)) return false

    try {
      setDeletingId(id)
      await deleteFn(id)
      setList(list.filter((item) => item.id !== id))
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
      return false
    } finally {
      setDeletingId(null)
    }
  }

  return { deletingId, error, deleteItem }
}
