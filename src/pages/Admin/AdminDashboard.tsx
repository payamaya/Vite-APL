import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../Components/common/layouts/DashboardLayout'

const AdminDashboard = () => {
  return (
    <DashboardLayout role='admin' title='Admin Dashboard'>
      <Outlet />
    </DashboardLayout>
  )
}

export default AdminDashboard
