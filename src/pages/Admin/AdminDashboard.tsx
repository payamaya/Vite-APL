// src/pages/admin/Dashboard.tsx
import DashboardLayout from '../../Components/common/DashboardLayout'
import ReusableTable from '../../Components/common/tables/ReusableTable'
import { ADMIN_NAV_ITEMS } from '../../config/navItems'

const AdminDashboard = () => {
  // Sample data
  const courses = [
    { id: 1, name: 'Mathematics', teacher: 'John Doe', students: 25 },
    { id: 2, name: 'Science', teacher: 'Jane Smith', students: 30 },
  ]

  const courseColumns = [
    { header: 'Course Name', accessor: 'name', sortable: true },
    { header: 'Teacher', accessor: 'teacher', sortable: true },
    { header: 'Students', accessor: 'students', sortable: true },
  ]

  return (
    <DashboardLayout
      role='admin'
      title='Admin Dashboard'
      navItems={ADMIN_NAV_ITEMS}
    >
      <div className='mb-5'>
        <h4>Admin Dashboard</h4>
        <ReusableTable
          data={courses}
          columns={courseColumns}
          searchPlaceholder='Search courses...'
        />
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
