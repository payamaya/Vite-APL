/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IColumn {
  header: string
  accessor: string
  sortable?: boolean
  width?: string
  render?: (value: any, row: any) => React.ReactNode
}
