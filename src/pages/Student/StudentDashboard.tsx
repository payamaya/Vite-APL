// src/pages/student/Dashboard.tsx
import DashboardLayout from '../../Components/common/DashboardLayout'
import ReusableTable from '../../Components/common/tables/ReusableTable'

const StudentDashboard = () => {
  // Sample data - replace with real data from your API
  const courses = [
    { id: 1, name: 'Mathematics', teacher: 'John Doe', grade: 'A-' },
    { id: 2, name: 'Science', teacher: 'Jane Smith', grade: 'B+' },
  ]

  const notices = [
    {
      id: 1,
      title: 'Exam Schedule',
      date: '2023-06-15',
      description: 'Final exams will start next week',
    },
    {
      id: 2,
      title: 'Library Closure',
      date: '2023-06-08',
      description: 'Library will be closed for maintenance',
    },
  ]

  const courseColumns = [
    { header: 'Course Name', accessor: 'name', sortable: true },
    { header: 'Teacher', accessor: 'teacher', sortable: true },
    { header: 'Grade', accessor: 'grade', sortable: true },
  ]

  const noticeColumns = [
    { header: 'Title', accessor: 'title', sortable: true },
    { header: 'Date', accessor: 'date', sortable: true },
    { header: 'Description', accessor: 'description', sortable: false },
  ]

  return (
    <DashboardLayout role='student' title='Student Dashboard'>
      <div className='mb-5'>
        <h4>My Courses</h4>
        <ReusableTable
          data={courses}
          columns={courseColumns}
          searchPlaceholder='Search courses...'
        />
      </div>

      <div className='mb-5'>
        <h4>Notices</h4>
        <ReusableTable
          data={notices}
          columns={noticeColumns}
          searchPlaceholder='Search notices...'
        />
      </div>
    </DashboardLayout>
  )
}

export default StudentDashboard
