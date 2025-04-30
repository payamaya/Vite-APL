import { NavLink } from 'react-router-dom'
import { NavItemListProps } from './NavItemList.types'

const NavItemList: React.FC<NavItemListProps> = ({
  items,
  className = 'nav',
  itemClassName = 'nav-item mx-2',
  linkClassName = 'nav-link text-light',
  onClick,
}) => (
  <ul className={className}>
    {items.map((item) => (
      <li key={`${item.label}-${item.link}`} className={itemClassName}>
        <NavLink
          className={linkClassName}
          to={item.link}
          onClick={onClick}
          aria-disabled={item.disabled}
        >
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
)

export default NavItemList
