/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import API_BASE_URL from '../api/apiConfig'
import { ROUTES } from '../routes'

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation()
  const email = state?.email || ''

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)

    try {
      const response = // In the OTP sending request in your frontend
        await axios.post(
          `${API_BASE_URL}auth/verify-otp`,
          { code: otp },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        )

      if (response.data.success) {
        console.log(`OTP sent to email: ${email}`)
        setMessage('OTP verified successfully!')
        // Redirect based on user role or to dashboard
        navigate(ROUTES.USER.DASHBOARD)
      } else {
        setError('Verification failed. Please try again.')
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Verification failed. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await axios.post(`${API_BASE_URL}auth/resend-otp`, {})
      setMessage('New OTP sent to your email')
      setError('')
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          '🔅⏺️Failed to resend OTP. Please try again later.⏺️🔅'
      )
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Verify OTP</h2>
      <p>Enter the 6-digit code sent to {email}</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type='text'
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
            setError('')
          }}
          placeholder='Enter OTP code'
          maxLength={6}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '100%',
            marginBottom: '1rem',
          }}
        />
        <button
          type='submit'
          disabled={isLoading || otp.length !== 6}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      <button
        onClick={handleResend}
        disabled={isLoading}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Resend OTP
      </button>
      {message && (
        <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>
      )}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  )
}

export default OTPVerificationPage
