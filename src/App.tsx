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
  const currentRole: RoleOrPublic = 'teacher'

  return (
    <>
      <Navbar
        brand={NAV_BRAND}
        navItems={PUBLIC_NAV_ITEMS}
        currentRole={currentRole}
        fixed={'top'}
      />
      <main className='main flex-grow-1'>
        <AppRoutes />
      </main>
      <Footer
        currentRole={currentRole}
        footerItems={FOOTER_NAV_ITEMS}
        brand={NAV_BRAND}
        fixed={'bottom'}
      />
    </>
  )
}

export default App
