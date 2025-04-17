import { IColumn } from './IColumn'

const courseTableColumns: IColumn[] = [
  { header: 'Title', accessor: 'title', sortable: true },
  { header: 'Description', accessor: 'description', sortable: true },
  { header: 'Start Date', accessor: 'startDate', sortable: true },
  { header: 'End Date', accessor: 'endDate', sortable: true },
]

export default courseTableColumns
