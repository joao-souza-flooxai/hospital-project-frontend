import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchPreferences, updatePreferences } from '../redux/reducers/preferencesActions'
import { useNavigate } from 'react-router-dom';


export default function Preferences() {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state) => state.auth)

  const isAdmin = user?.role === 'admin'

  const [form, setForm] = useState({
    name: '',
    email: '',
    document: '',
    age: '',
    gender: '',
    location: '',
  })

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPreferences())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        document: user.document || '',
        age: user.age?.toString() || '',
        gender: user.gender || '',
        location: user.location || '',
      })
    }
  }, [user])


  
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      ...form,
      age: parseInt(form.age) || 0, 
    }

    dispatch(updatePreferences(data));
    navigate(0); 
  }

  if (loading) return <p className="p-6">Carregando...</p>
  if (error) return <p className="p-6">Erro: {error}</p>
  if (!user) return null

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Preferências</h1>
      <p className="mt-2">Configurações da sua conta.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Nome</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {isAdmin ? (
          <div>
            <label className="block mb-1">Hospital</label>
            <input
              value={user.hospital || ''}
              className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block mb-1">Documento</label>
              <input
                name="document"
                value={form.document}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Idade</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
                min={0}
              />
            </div>

            <div>
              <label className="block mb-1">Gênero</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Selecione</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OTHER">Outro</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Localização</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Score</label>
              <input
                value={user.score?.toString() || '0'}
                className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
