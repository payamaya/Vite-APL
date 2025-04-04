import Navbar from './Components/Navbar/Navbar'
import AppRoutes from './routes/AppRoutes'
import { NAV_ITEMS, NAV_BRAND } from './config/navItems'
function App() {
  return (
    <>
      <Navbar
        brand={NAV_BRAND}
        navItems={NAV_ITEMS}
        fixed={'top'}
        showSearch={true}
      />
      <AppRoutes />
    </>
  )
}

export default App
