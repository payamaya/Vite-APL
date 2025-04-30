import { IColumn } from './IColumn'

const studentableColumns: IColumn[] = [
  { header: 'First Name', accessor: 'firstName', sortable: true },
  { header: 'Address', accessor: 'address', sortable: true },

  {
    header: 'Telephone',
    accessor: 'telephone',
    sortable: true,
  },
  {
    header: 'Email',
    accessor: 'email',
    sortable: true,
  },
]

export default studentableColumns
