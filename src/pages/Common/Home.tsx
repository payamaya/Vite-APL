import { useNavigate } from 'react-router-dom'
import authService from '../../api/authService'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import ReusableInput from '../../Components/common/inputs/ReusableInput'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { UserRoleValue } from '../../constants/RolesEnum'

const Home = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuthenticated } = useAuth()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { role, token } = await authService.login({
        email: formData.email,
        password: formData.password,
      })

      // Store token and role
      authService.setToken(token)
      authService.setUserRole(role as UserRoleValue)

      // Update auth context
      setAuthenticated(true, role as UserRoleValue)

      // Navigate to appropriate dashboard
      navigate(`${role}`)

      setFormData({ email: '', password: '' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login failed', error)
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Login failed. Please try again.'
      setError(errorMessage)
      setAuthenticated(false, null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='container d-flex justify-content-center'>
      <form onSubmit={handleSubmit} className='card w-50 p-4 my-4 border-2'>
        <h1 className='d-flex justify-content-center pb-4'>Login</h1>
        <ReusableInput
          label='Email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          error={error?.toLowerCase().includes('email') ? error : ''}
        />
        <ReusableInput
          autoComplete='true'
          label='Password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={error?.toLowerCase().includes('password') ? error : ''}
        />
        {error &&
          !error.toLowerCase().includes('email') &&
          !error.toLowerCase().includes('password') && (
            <div className='alert alert-danger'>{error}</div>
          )}
        <ReusableButton type='submit' disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </ReusableButton>
      </form>
    </section>
  )
}

export default Home
