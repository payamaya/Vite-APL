import { ReactNode } from 'react'

export interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  className?: string
  theme?: 'light' | 'dark'
  loading?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  label?: string
  children?: ReactNode
}
