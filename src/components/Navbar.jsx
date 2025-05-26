import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/authActions'

export default function Navbar() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between">
      <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold">
          Hospital
        </Link>

      </div>

      <div className="flex gap-4 items-center">
        
        {user?.role === 'admin' && (
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
        )}
         <Link to="/leaderboard">Leaderboard</Link>
        {user ? (
          <>
            <Link to="/preferences" className="hover:underline">
              Preferências
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
