// src/pages/admin/Dashboard.tsx
import { Outlet } from 'react-router-dom'
import DashboardLayout from '../../Components/common/layouts/DashboardLayout'

// import { ADMIN_NAV_ITEMS } from '../../config/navItems'

const AdminDashboard = () => {
  return (
    <DashboardLayout
      role='admin'
      title='Admin Dashboard'
      // navItems={ADMIN_NAV_ITEMS}
    >
      <Outlet />
    </DashboardLayout>
  )
}

export default AdminDashboard
