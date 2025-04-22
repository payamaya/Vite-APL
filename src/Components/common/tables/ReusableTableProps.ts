/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn } from './IColumn'

export interface ReusableTableProps {
  data: any[]
  columns: IColumn[]
  onRowClick?: (row: any) => void
  searchPlaceholder?: string
}
