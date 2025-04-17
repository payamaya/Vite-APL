// src/App.tsx
import Navbar from './Components/navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import { NAV_BRAND, PUBLIC_NAV_ITEMS } from './config/navItems'
import { RoleOrPublic } from './types'

function App() {
  const currentRole: RoleOrPublic = 'teacher' // or get from auth context

  return (
    <>
      <Navbar
        brand={NAV_BRAND}
        navItems={PUBLIC_NAV_ITEMS}
        currentRole={currentRole}
        fixed={'top'}
      />
      <AppRoutes />
    </>
  )
}

export default App
