import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPreferences, updatePreferences } from '../redux/actions/preferencesActions'
import ErrorModal from './ErrorModal'
export default function UpdatePreferences() {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.auth)
  const{ error: errorUpdate, success:successUpdate } = useSelector((state)=>state.preferences);
  const isAdmin = user?.role === 'admin'

  const [form, setForm] = useState({
    name: '',
    email: '',
    document: '',
    age: '',
    gender: '',
    location: '',
  })

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
    dispatch(updatePreferences(data))
  }

  if (loading) return <p className="p-6">Carregando...</p>
  if (!user) return null

  return (
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

        {errorUpdate && (
        <ErrorModal
          title="Falha"
          message={errorUpdate}
          onClose={() => dispatch(  { type: 'CLEAR_PREFERENCES_UPDATE_ERRORS' }  
          )}
        />
      )}

    {(successUpdate) && (
      <ErrorModal
        title="Sucesso"
        message="Operação realizada com sucesso!"
        onClose={() => dispatch({ type: 'CLEAR_PREFERENCES_UPDATE_SUCCESS' })}
      />
    )}

    </form>

  
  )
}
