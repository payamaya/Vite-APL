import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='container text-center mt-5'>
      <h1 className='display-4 text-warning'>404 - Page Not Found</h1>
      <p className='lead'>The page you're looking for does not exist.</p>
      <p>It might have been moved or deleted.</p>
      <Link to='/' className='btn btn-secondary mt-3'>
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
