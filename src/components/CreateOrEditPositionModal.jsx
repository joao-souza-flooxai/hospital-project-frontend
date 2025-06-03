import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPosition, updatePosition } from '../redux/actions/adminPositionsActions'

export default function CreateOrEditPositionModal({ isOpen, onClose, position }) {
  const dispatch = useDispatch()

  const { loading, error } = useSelector((state) => state.adminPositions)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'IDOSOS',
    spots: 0,
    status: 'ACTIVE',
    finished_at: ''
  })

  useEffect(() => {
    if (position) {
      setFormData({
        title: position.title,
        description: position.description,
        type: position.type,
        spots: position.spots,
        status: position.status,
        finished_at: position.finished_at ? position.finished_at.split('T')[0] : '',
      })
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'IDOSOS',
        spots: 1,
        status: 'ACTIVE',
        finished_at: '',
      })
    }
  }, [position, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'spots' ? Number(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

   const payload = {
    ...formData,
  }

    if (position) {
      dispatch(updatePosition(position.id, payload))
    } else {
      dispatch(createPosition(payload))
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-lg w-[500px]'>
        <h2 className='text-xl font-bold mb-4'>
          {position ? 'Editar Vaga' : 'Criar Vaga'}
        </h2>

        {error && <p className='text-red-500 mb-2'>{error}</p>}

        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            name='title'
            placeholder='Título'
            value={formData.title}
            onChange={handleChange}
            required
            className='border p-2 rounded'
          />
          <textarea
            name='description'
            placeholder='Descrição'
            value={formData.description}
            onChange={handleChange}
            required
            className='border p-2 rounded'
          />

          <select
            name='type'
            value={formData.type}
            onChange={handleChange}
            className='border p-2 rounded'
          >
            <option value='IDOSOS'>Idosos</option>
            <option value='JOVENS'>Jovens</option>
            <option value='FAMILIAR'>Familiar</option>
          </select>

          <input
            name='spots'
            type='number'
            placeholder='Quantidade de vagas'
            value={formData.spots}
            onChange={handleChange}
            className='border p-2 rounded'
            min={0}
          />

          <select
            name='status'
            value={formData.status}
            onChange={handleChange}
            className='border p-2 rounded'
          >
            <option value='ACTIVE'>ACTIVE</option>
            <option value='PENDING'>PENDING</option>
            <option value='CLOSED'>CLOSED</option>
          </select>

          <label className="flex flex-col">
              Data de Expiração:
              <input
                name="finished_at"
                type="date"
                value={formData.finished_at}
                onChange={handleChange}
                className="border p-2 rounded"
                min={minDate}
                required
              />
            </label>

          <div className='flex justify-end gap-2 mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='bg-gray-300 px-4 py-2 rounded'
            >
              Cancelar
            </button>
            <button
              type='submit'
              className='bg-blue-600 text-white px-4 py-2 rounded'
              disabled={loading}
            >
              {loading ? 'Salvando...' : position ? 'Salvar Alterações' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
