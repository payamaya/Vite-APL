// src/Components/common/tables/noticeTableColumns.ts
import { IColumn } from './IColumn'

const noticeTableColumns: IColumn[] = [
  { header: 'Title', accessor: 'title', sortable: true },
  { header: 'Content', accessor: 'content', sortable: true },
  { header: 'Date', accessor: 'date', sortable: true },
]

export default noticeTableColumns
