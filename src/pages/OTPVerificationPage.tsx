/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import API_BASE_URL from '../api/apiConfig'
import { ROUTES } from '../routes'
import authService from '../api/authService'

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const navigate = useNavigate()
  // const location = useLocation()
  // const email = location.state?.email || localStorage.getItem('email')
  // const token = location.state?.token || localStorage.getItem('authToken')
  const token = authService.getToken(); // ✅ clean, consistent
  const email = localStorage.getItem('email'); // can later move to service if needed


// Use `token` in headers or send to backend if needed
  const hasSentOtpRef = useRef(false)                                      // ← ADDED guard ref

  //✅ Send OTP when the page loads
  useEffect(() => {
    if (hasSentOtpRef.current) return                                      // ← SKIP if already run
    hasSentOtpRef.current = true                                           // ← MARK as run

    const sendInitialOtp = async () => {
      if (!email) return
      setIsSendingOtp(true)
      try {
        await axios.post(`${API_BASE_URL}auth/send-otp`, { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
             withCredentials: true,
          }
        )
        setMessage('OTP has been sent to your email.')
      } catch (err: any) {
        console.error('Failed to send OTP on load:', err)
        setError(
          err.response?.data?.message ||
            'Failed to send OTP. Please try again later.'
        )
      } finally {
        setIsSendingOtp(false)
      }
    }

    sendInitialOtp()
  }, [email, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code')
      return
    }

    setIsLoading(true)

    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/verify-otp`,
        { code: otp, email }, // Include email if backend expects it
        {
           headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        }
      )

      if (response.data.success) {
        setMessage('OTP verified successfully!')
        navigate(ROUTES.HOME)
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
      await axios.post(`${API_BASE_URL}auth/send-otp`, { email },
        {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
             withCredentials: true,
          }
      )
      setMessage('New OTP sent to your email')
      setError('')
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          '🔅⏺️ Failed to resend OTP. Please try again later. ⏺️🔅'
      )
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Verify OTP</h2>
      <p>Enter the 6-digit code sent to <strong>{email}</strong></p>
      {isSendingOtp && <p>Sending OTP...</p>}
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
