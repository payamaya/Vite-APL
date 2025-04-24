import { formatDate } from '../../../utils/dateUtils'
import { IColumn } from './IColumn'

const courseTableColumns: IColumn[] = [
  { header: 'Title', accessor: 'title', sortable: true },
  { header: 'Description', accessor: 'description', sortable: true },
  {
    header: 'Start Date',
    accessor: 'startDate',
    sortable: true,
    render: (value) => formatDate(value),
  },
  {
    header: 'End Date',
    accessor: 'endDate',
    sortable: true,
    render: (value) => formatDate(value),
  },
]

export default courseTableColumns
