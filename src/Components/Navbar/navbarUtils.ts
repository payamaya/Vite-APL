export const handleMenuClose =
  (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setIsOpen(false)
  }
export const toggleMenu =
  (isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) =>
  () => {
    setIsOpen(!isOpen)
  }
