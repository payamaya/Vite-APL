import authService from '../../api/authService'
import Cards from '../../Components/Cards'
import ReusableButton from '../../Components/common/buttons/ReusableButton'
import ReusableInput from '../../Components/common/inputs/ReusableInput'
import React, { useState } from 'react'
const Home = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted data:', formData)
    setIsLoading(true)
    setError(null)
    //Clear input

    try {
      const token = await authService.login({
        email: formData.email,
        password: formData.password,
      })
      console.log('Login success. Token', token)
      setFormData({ email: '', password: '' })
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <section className='container'>
      <h1>Home</h1>
      {/* <div>{import.meta.env.VITE_API_URL}</div> */}
      <Cards
        imgSrc={'/public/read.png'}
        title={'Home Title'}
        text={'Home'}
        buttonLink={'https://getbootstrap.com/docs/5.3/components/card/'}
      />

      <form onSubmit={handleSubmit}>
        <ReusableInput
          label='Email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          error={error && error.toLowerCase().includes('email') ? error : ''}
        />
        <ReusableInput
          label='Password'
          name='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={error && error.toLowerCase().includes('password') ? error : ''}
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
