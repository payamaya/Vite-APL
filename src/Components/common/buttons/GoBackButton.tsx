import React from 'react'
import { useNavigate } from 'react-router-dom' // Use useNavigate from react-router-dom v6
import ReusableButton from './ReusableButton'
// Assuming ReusableButton is in this location

// GoBackButton component
const GoBackButton: React.FC = () => {
  const navigate = useNavigate() // Hook to navigate back one page

  const handleGoBack = () => {
    navigate(-1) // Navigate back one page in history
  }

  return (
    <ReusableButton
      as='button'
      onClick={handleGoBack} // Trigger the handleGoBack function on button click
      label='Go Back'
      // startIcon={<FaArrowLeft />} Add Icon If
      theme='light' // You can modify this based on your theme requirements
    />
  )
}

export default GoBackButton
