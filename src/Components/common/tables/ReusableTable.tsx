/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Components/common/Table/ReusableTable.tsx
import { useState, useMemo } from 'react'
import { FaSort, FaSortUp, FaSortDown, FaSearch } from 'react-icons/fa'

interface Column {
  header: string
  accessor: string
  sortable?: boolean
  width?: string
}

interface ReusableTableProps {
  data: any[]
  columns: Column[]
  onRowClick?: (row: any) => void
  searchPlaceholder?: string
}

const ReusableTable = ({
  data,
  columns,
  onRowClick,
  searchPlaceholder = 'Search...',
}: ReusableTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'ascending' | 'descending'
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.some((column) => {
        const value = row[column.accessor]?.toString().toLowerCase()
        return value?.includes(searchTerm.toLowerCase())
      })
    )
  }, [data, searchTerm, columns])

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (accessor: string) => {
    if (!sortConfig || sortConfig.key !== accessor) {
      return <FaSort />
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />
  }

  return (
    <div className='table-responsive'>
      <div className='mb-3'>
        <div className='input-group'>
          <span className='input-group-text'>
            <FaSearch />
          </span>
          <input
            type='text'
            className='form-control'
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className='table table-hover'>
        <thead className='table-light'>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                style={{ width: column.width }}
                onClick={() => column.sortable && requestSort(column.accessor)}
                className={column.sortable ? 'cursor-pointer' : ''}
              >
                <div className='d-flex align-items-center'>
                  {column.header}
                  {column.sortable && (
                    <span className='ms-2'>{getSortIcon(column.accessor)}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick && onRowClick(row)}
              className={onRowClick ? 'cursor-pointer' : ''}
            >
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReusableTable
