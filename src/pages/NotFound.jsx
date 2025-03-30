import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">404 - Page Not Found</h1>
      <p className="mb-4">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Return to Home
      </Link>
    </div>
  )
}

export default NotFound 