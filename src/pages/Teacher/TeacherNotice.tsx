/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Components/pages/TeacherNotice.tsx
import { useState, useEffect } from 'react'
import noticeTableColumns from '../../Components/common/tables/noticeTableColumns'
import ReusableTable from '../../Components/common/tables/ReusableTable'

import { INotice } from '../../interfaces/ui/INotice'
import courseService from '../../services/coursesService'

function TeacherNotice() {
  const [notices, setNotices] = useState<any[]>([]) // You can replace 'any' with a specific type if you have one
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // TODO Must change the courseService to noticeService
        //TODO Must change getAllCourses() to getAllNotices()
        //  const response = await noticeService.getAllNotices()
        const response = await courseService.getAllCourses() // example: replace with your actual service
        const data = response.data as INotice[]
        setNotices(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  return (
    <>
      <div className='mb-5'>
        <h4>Notices</h4>
        {loading && <p>Loading notices...</p>}
        {error && <div className='alert alert-danger'>{error.message}</div>}
        {notices.length === 0 && !loading && !error && (
          <div className='alert alert-info'>No notices available.</div>
        )}
        {notices.length > 0 && (
          <ReusableTable
            data={notices} // Pass the fetched notices data
            columns={noticeTableColumns}
            searchPlaceholder='Search notices...'
          />
        )}
      </div>
    </>
  )
}

export default TeacherNotice
