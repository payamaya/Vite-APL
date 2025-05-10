// ResourceList.types.ts
import { ReactNode } from 'react'

export interface ResourceListProps<T> {
  items: T[]
  loading?: boolean
  error?: string | null
  emptyMessage?: string
  renderItem: (item: T) => ReactNode
  keyExtractor: (item: T) => string | number
  className?: string
  listClassName?: string
  itemClassName?: string
}
