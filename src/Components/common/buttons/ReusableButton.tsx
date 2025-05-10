import { ReusableButtonProps } from '../../../interfaces/components/common/ButtonProps'
import { NavLink, Link } from 'react-router-dom'

const themeClass = {
  light: 'btn btn-outline-secondary',
  dark: 'btn btn-outline-light',
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  children,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  theme = 'light',
  as = 'button',
  to,
  loading = false,
  startIcon,
  endIcon,
}) => {
  const btnClass = `${themeClass[theme]} ${className}`

  const content = (
    <>
      {loading ? (
        <span
          className='spinner-border spinner-border-sm me-2'
          role='status'
          aria-hidden='true'
        ></span>
      ) : (
        startIcon && <span className='me-2'>{startIcon}</span>
      )}
      {label}
      {endIcon && !loading && <span className='ms-2'>{endIcon}</span>}
    </>
  )

  if (as === 'navlink') {
    return (
      <NavLink to={to || '#'} className={btnClass} onClick={onClick}>
        {children || content}
      </NavLink>
    )
  }

  if (as === 'link') {
    return (
      <Link to={to || '#'} className={btnClass} onClick={onClick}>
        {children || content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={btnClass}
    >
      {children || content}
    </button>
  )
}

export default ReusableButton
