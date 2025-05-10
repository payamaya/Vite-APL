import React from 'react'
import { useNavigate } from 'react-router-dom'
import ReusableButton from './ReusableButton'

const GoBackButton: React.FC = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1) // Navigate back one page in history
  }

  return (
    <ReusableButton
      as='button'
      onClick={handleGoBack}
      label='Go Back'
      // startIcon={<FaArrowLeft />} Add Icon If
      theme='light'
    />
  )
}

export default GoBackButton
