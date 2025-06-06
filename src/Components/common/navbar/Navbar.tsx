import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarProps } from './Navbar.types'
import { handleMenuClose, toggleMenu } from './Navbar.utils'
import ReusableButton from '../buttons/ReusableButton'
import { filterNavItemsByRole } from '../../../utils/navUtils'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'
const Navbar: React.FC<NavbarProps> = ({
  brand,
  navItems,
  dropdownLabel,
  dropdownItems,
  fixed = 'top',
  currentRole,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const filteredNavItems = filterNavItemsByRole(
    navItems,
    currentRole ?? undefined
  )

  const filteredDropdownItems = filterNavItemsByRole(
    dropdownItems || [],
    currentRole ?? undefined
  )

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary mx-0 ${
        fixed === 'top' ? 'sticky-top' : 'sticky-bottom'
      }`}
    >
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          {brand}
        </NavLink>
        <ReusableButton
          as='button'
          className='navbar-toggler'
          onClick={toggleMenu(isOpen, setIsOpen)}
          aria-controls='navbarSupportedContent'
          aria-expanded={isOpen}
          aria-label='Toggle navigation'
        >
          {isOpen ? <FaTimes className='fs-4' /> : <FaBars className='fs-4' />}
        </ReusableButton>

        {/* Menu Items */}
        <div
          className={`collapse navbar-collapse d-flex z-5 ${isOpen ? 'show' : ''}`}
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav me-auto m-2 mb-lg-0 d-flex flex-row justify-content-around'>
            {filteredNavItems.map((item, index) => (
              <li className='nav-item' key={index}>
                <NavLink
                  className={`nav-link ${item.disabled ? 'disabled' : ''}`}
                  to={item.link}
                  aria-disabled={item.disabled}
                  onClick={handleMenuClose(setIsOpen)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}

            {dropdownLabel &&
              filteredDropdownItems &&
              filteredDropdownItems.length > 0 && (
                <li className='nav-item dropdown'>
                  <NavLink
                    className='nav-link dropdown-toggle'
                    to='#'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {dropdownLabel}
                  </NavLink>
                  <ul className='dropdown-menu'>
                    {filteredDropdownItems.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          className='dropdown-item'
                          to={item.link}
                          onClick={handleMenuClose(setIsOpen)}
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
