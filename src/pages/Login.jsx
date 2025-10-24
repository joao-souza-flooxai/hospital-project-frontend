import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { login } from '../redux/actions/authActions'
import ErrorModal from '../components/ErrorOrSucessModal'
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error,user } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    const credentials = { email, password }
    const isAdmin = role === 'admin'

    dispatch(login(credentials, isAdmin))
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <label className="block mb-1">Email</label>
        <input
          type="email"
          className="border w-full p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-1">Senha</label>
        <input
          type="password"
          className="border w-full p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2">Tipo de Usuário:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border w-full p-2 mb-4"
        >
          <option value="user">Usuário</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

           {error && (
          <ErrorModal
            title="Falha"
            message={error}
            onClose={() => dispatch({ type: 'CLEAR_LOGIN_ERRORS' })}
          />
        )}
        
    </div>
  )
}
