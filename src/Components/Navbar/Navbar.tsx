import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarProps } from './navbarInterfaces'
import { handleMenuClose, toggleMenu } from './navbarUtils'
import ReusableButton from '../common/buttons/ReusableButton'

const Navbar: React.FC<NavbarProps> = ({
  brand,
  navItems,
  dropdownLabel,
  dropdownItems,
  fixed = 'top',
  currentRole,
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Filter nav items based on role
  const filteredNavItems = navItems.filter((item) => {
    if (!item.role) return true
    if (item.role === 'all') return true
    return item.role === currentRole
  })

  // Filter dropdown items based on role
  const filteredDropdownItems = dropdownItems?.filter((item) => {
    if (!item.role) return true
    if (item.role === 'all') return true
    return item.role === currentRole
  })

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${
        fixed === 'top' ? 'fixed-top' : 'fixed-bottom'
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
          <span className='navbar-toggler-icon'></span>
        </ReusableButton>

        {/* Menu Items */}
        <div
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
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
