import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children, role }) {
  const { user, loading } = useSelector((state) => state.auth)

  if (loading) {
    return <div>Loading...</div> // Ou um spinner estilizado
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />
  }

  return children
}
