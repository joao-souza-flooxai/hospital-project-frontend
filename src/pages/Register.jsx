import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { register } from '../redux/actions/authActions'

export default function Register() {
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [location, setLocation] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, error, user } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      name,
      document,
      email,
      password,
      age: parseInt(age),
      gender: gender.toUpperCase(),
      location,
    }

    dispatch(register(userData))
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
        <h1 className="text-2xl font-bold mb-4">Registro de Usuário</h1>

        <label className="block mb-1">Nome</label>
        <input
          type="text"
          className="border w-full p-2 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-1">Documento (CPF)</label>
        <input
          type="text"
          className="border w-full p-2 mb-4"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          required
        />

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

        <label className="block mb-1">Idade</label>
        <input
          type="number"
          className="border w-full p-2 mb-4"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label className="block mb-2">Gênero:</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border w-full p-2 mb-4"
        >
          <option value="MALE">Masculino</option>
          <option value="FEMALE">Feminino</option>
          <option value="OTHER">Outro</option>
        </select>

        <label className="block mb-1">Localização</label>
        <input
          type="text"
          className="border w-full p-2 mb-4"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}
