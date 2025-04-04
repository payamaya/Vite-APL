import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { NavbarProps } from '../../interfaces/NavbarInterfaces'
import { handleMenuClose, toggleMenu } from './navbarUtils'

const Navbar: React.FC<NavbarProps> = ({
  brand,
  navItems,
  dropdownLabel,
  dropdownItems,
  // showSearch = false,
  fixed = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${fixed === 'top' ? 'fixed-top' : 'fixed-bottom'}`}
    >
      <div className='container-fluid'>
        <NavLink className='navbar-brand' to='/'>
          {brand}
        </NavLink>
        {/* Hamburger button */}
        <button
          className='navbar-toggler'
          type='button'
          onClick={toggleMenu(isOpen, setIsOpen)}
          aria-controls='navbarSupportedContent'
          aria-expanded={isOpen}
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Menu Items */}
        <div
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {navItems.map((item, index) => (
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

            {dropdownLabel && dropdownItems && (
              <li className='nav-item dropdown'>
                <NavLink
                  className='nav-link dropdown-toggle'
                  to='/'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {dropdownLabel}
                </NavLink>
                <ul className='dropdown-menu'>
                  {dropdownItems.map((item, index) => (
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

          {/* {showSearch && (
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
              <button className='btn btn-outline-success' type='submit'>
                Search
              </button>
            </form>
          )} */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
