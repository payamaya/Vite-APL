import { NavLink, useLocation } from 'react-router-dom'
import { SidebarProps } from './SidebarProps'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import './Sidebar.css'
import ReusableButton from '../buttons/ReusableButton'

const SideBar = ({ role, navItems, fixed = 'left' }: SidebarProps) => {
  const location = useLocation()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(() => {
    return window.innerWidth >= 768
  })

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 768
      setIsOpen(isDesktop)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close sidebar when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     // Only close if it's mobile view and sidebar is open
  //     if (
  //       window.innerWidth < 768 &&
  //       isOpen &&
  //       sidebarRef.current &&
  //       !sidebarRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false)
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [isOpen])

  const isActive = (path: string) =>
    location.pathname.startsWith(`/${role}${path}`)

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isOpen ? 'open' : 'closed'} ${
        fixed === 'right' ? 'sidebar-right' : 'sidebar-left'
      }`}
    >
      <ReusableButton
        className='sidebar-toggle'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle menu'
      >
        {isOpen ? (
          <FaAngleLeft className='fs-4' />
        ) : (
          <FaAngleRight className='fs-4' />
        )}
      </ReusableButton>

      <ul className='nav  mb-auto'>
        {navItems?.map((item) => (
          <li key={`${item.link}-${item.label}`} className='nav-item w-100'>
            <NavLink
              className={`nav-link py-2 px-3 mb-2 d-flex align-items-center ${
                isActive(item.link) ? ' text-white' : 'text-dark'
              }`}
              to={item.link}
              onClick={() => window.innerWidth < 768 && setIsOpen(false)}
            >
              {item.icon && <span className='me-2'>{item.icon}</span>}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default SideBar
