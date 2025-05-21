/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes'
import authService from '../api/authService'
import { ReusableInput } from '../Components/common/inputs'
import ReusableButton from '../Components/common/buttons/ReusableButton'

const SetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!password || !confirmPassword) {
      setError('Both fields are required.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      const result = await authService.setPassword(password)

      if (result.success) {
        setSuccessMessage(result.message)
        setTimeout(() => navigate(ROUTES.HOME), 2000)
      } else {
        setError(result.message)
      }
    } catch (err: any) {
      console.error('Set password failed:', err)
      setError(err.message || 'Error setting password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='container d-flex justify-content-center'>
      <form onSubmit={handleSubmit} className='card w-50 p-4 my-4 border-2'>
        <h2 className='text-center mb-4'>Set Your Password</h2>

        <ReusableInput
          label='New Password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.toLowerCase().includes('password') ? error : ''}
        />

        <ReusableInput
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error.toLowerCase().includes('match') ? error : ''}
        />

        {error && !error.toLowerCase().includes('match') && (
          <div className='alert alert-danger'>{error}</div>
        )}

        {successMessage && (
          <div className='alert alert-success'>{successMessage}</div>
        )}

        <ReusableButton type='submit' disabled={isLoading}>
          {isLoading ? 'Setting Password...' : 'Set Password'}
        </ReusableButton>
      </form>
    </section>
  )
}

export default SetPasswordPage
