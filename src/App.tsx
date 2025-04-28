// src/App.tsx
import Navbar from './Components/common/navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import {
  FOOTER_NAV_ITEMS,
  NAV_BRAND,
  PUBLIC_NAV_ITEMS,
} from './config/navItems'
import { RoleOrPublic } from './types'
import Footer from './Components/common/footer/Footer'

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
      <Footer
        currentRole={currentRole}
        footerItems={FOOTER_NAV_ITEMS}
        brand='My E-Learning Platform'
      />
    </>
  )
}

export default App
