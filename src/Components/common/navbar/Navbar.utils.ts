import { Dispatch, SetStateAction } from 'react'

export const handleMenuClose =
  (setIsOpen: Dispatch<SetStateAction<boolean>>) => () => {
    setIsOpen(false)
  }

export const toggleMenu =
  (isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>) => () => {
    setIsOpen(!isOpen)
  }
