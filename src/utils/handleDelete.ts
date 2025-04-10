export const handleDelete = async <T>(
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteFn: (id: string) => Promise<{ data: any }>, // <-- accept ApiResponse
  setList: React.Dispatch<React.SetStateAction<T[]>>,
  list: T[],
  setError?: React.Dispatch<React.SetStateAction<string | null>>,
  confirmMessage = 'Are you sure you want to delete this item?',
  setDeletingId?: React.Dispatch<React.SetStateAction<string | null>>
) => {
  if (!window.confirm(confirmMessage)) return

  try {
    setDeletingId?.(id)
    await deleteFn(id) // We don't care about the response data in delete
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setList(list.filter((item: any) => item.id !== id))
  } catch (error) {
    if (setError) {
      setError(error instanceof Error ? error.message : 'Failed to delete item')
    }
  } finally {
    setDeletingId?.(null)
  }
}
