// src/App.tsx
import Navbar from './Components/common/navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import {
  FOOTER_NAV_ITEMS,
  NAV_BRAND,
  PUBLIC_NAV_ITEMS,
} from './config/navItems'

import Footer from './Components/common/footer/Footer'
import { useAuth } from './hooks/useAuth'

function App() {
  const { user } = useAuth()

  return (
    <>
      <Navbar
        brand={NAV_BRAND}
        navItems={PUBLIC_NAV_ITEMS}
        currentRole={user ?? undefined}
        fixed={'top'}
      />
      <main className='main flex-grow-1'>
        <AppRoutes />
      </main>
      <Footer
        currentRole={user ?? undefined}
        footerItems={FOOTER_NAV_ITEMS}
        brand={NAV_BRAND}
        fixed={'bottom'}
      />
    </>
  )
}

export default App
