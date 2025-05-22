import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/reducers/authReducer'
import { useState } from 'react'

export default function Login() {
  const [role, setRole] = useState('user')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const fakeUser = {
      id: 1,
      name: role === 'admin' ? 'Admin' : 'User',
      role: role
    }

    dispatch(login(fakeUser))
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow rounded max-w-sm w-full"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>

        <label className="block mb-2">Escolha o tipo de usuário:</label>
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
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
