import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducers/authReducer'

export default function Navbar() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link to="/" className="text-xl font-bold">Hospital</Link>
      
      <div className="flex gap-4 items-center">
        {!user && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}

        {user && (
          <>
            <Link to="/preferences" className="hover:underline">
              Preferências
            </Link>
            {user.role === 'admin' && (
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
