// components/footer/Footer.tsx
import { FooterProps } from './FooterProps'
import { filterNavItemsByRole } from '../../../utils/navUtils'
import NavItemList from '../navbar/NavItemList/NavItemList'
import { NavLink } from 'react-router-dom'

const Footer: React.FC<FooterProps> = ({
  footerItems,
  currentRole,
  brand,
  fixed = 'bottom',
}) => {
  const filteredItems = filterNavItemsByRole(footerItems, currentRole)

  return (
    <footer
      className={`bg-dark text-light py-3 mt-auto w-100 ${fixed === 'top' ? 'fixed-top' : 'fixed-bottom'}`}
    >
      <section className='container-fluid d-flex justify-content-between align-items-center flex-wrap'>
        <NavLink className='footer-brand fw-bold' to='/'>
          {brand}
        </NavLink>
        <NavItemList items={filteredItems} />
      </section>
    </footer>
  )
}

export default Footer
