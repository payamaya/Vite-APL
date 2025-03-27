import React, { useState } from 'react'

interface NavItem {
  label: string
  link: string
  disabled?: boolean
}

interface DropdownItem {
  label: string
  link: string
}

interface NavbarProps {
  brand: string
  navItems: NavItem[]
  dropdownLabel?: string
  dropdownItems?: DropdownItem[]
  showSearch?: boolean
  fixed: 'top' | 'bottom'
}

const Navbar: React.FC<NavbarProps> = ({
  brand,
  navItems,
  dropdownLabel,
  dropdownItems,
  // showSearch = true,
  fixed = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className={`navbar navbar-expand-lg bg-body-tertiary ${fixed === 'top' ? 'fixed-top' : 'fixed-bottom'}`}
    >
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          {brand}
        </a>
        {/* Hamburger button */}
        <button
          className='navbar-toggler'
          type='button'
          onClick={() => setIsOpen(!isOpen)}
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
                <a
                  className={`nav-link ${item.disabled ? 'disabled' : ''}`}
                  href={item.link}
                  aria-disabled={item.disabled}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {dropdownLabel && dropdownItems && (
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  {dropdownLabel}
                </a>
                <ul className='dropdown-menu'>
                  {dropdownItems.map((item, index) => (
                    <li key={index}>
                      <a className='dropdown-item' href={item.link}>
                        {item.label}
                      </a>
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
