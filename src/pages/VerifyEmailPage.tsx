/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../api/apiConfig'

import { Spinner } from 'react-bootstrap'
import { ROUTES } from '../routes'

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>(
    'verifying'
  )
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('Invalid confirmation link: no token provided.')
      return
    }

    const verifyEmail = async () => {
      try {
        console.log(
          'Making request to:',
          `${API_BASE_URL}auth/confirm-email?token=${token}`
        )

        const response = await axios.get(`${API_BASE_URL}auth/confirm-email`, {
          params: { token },
          timeout: 10000,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Full response:', {
          status: response.status,
          data: response.data,
          headers: response.headers,
        })

        console.log('Verification response:', response)

        if (response.status === 200) {
          setStatus('success')
          setMessage('Email verified! Check your inbox for OTP.')

          // Auto-navigate after delay
          setTimeout(
            () =>
              navigate('/api/auth/verify-otp', {
                state: { email: response.data.email, 
                         token: token },
              }),
            3000
          )
          return
        }

        setStatus('error')
        setMessage(response.data?.message || 'Verification failed')
      } catch (err: any) {
        console.error('Verification error:', err)
        setStatus('error')
        setMessage(
          err.response?.data?.message ||
            err.message ||
            'Network error. Please try again.'
        )
      }
    }

    verifyEmail()
  }, [searchParams, navigate])

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6 text-center'>
          <div className='card shadow rounded p-4'>
            <h2 className='mb-4'>Email Verification</h2>

            {status === 'verifying' && (
              <>
                <Spinner animation='border' role='status' className='mb-3' />
                <p>Verifying your email, please wait...</p>
              </>
            )}

            {status === 'success' && (
              <div className='alert alert-success' role='alert'>
                {message}
              </div>
            )}

            {status === 'error' && (
              <>
                <div className='alert alert-danger' role='alert'>
                  {message}
                </div>
                <button
                  className='btn btn-primary mt-3'
                  onClick={() => navigate(ROUTES.AUTH.REGISTER)}
                >
                  Back to Registration
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
