import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { applyToPosition } from '../redux/actions/applicationActions'

export default function CardPosition({ position }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const handleApply = () => {
    if (!user) {
      navigate('/login')
      return
    }

    const confirmApply = window.confirm(
      `Deseja realmente se inscrever para a posição "${position.title}"?`
    )

    if (!confirmApply) return

    dispatch(applyToPosition(position.id))
  }

  return (
    <div className="border rounded shadow hover:shadow-md transition bg-white">
      <div className="flex justify-between items-center bg-blue-600 text-white rounded-t px-4 py-3 font-semibold">
        <h2 className="text-xl">
          {position.title} {position.spots ? `- Vagas: ${position.spots}` : ''}
        </h2>
        <span className="bg-blue-400 border border-blue-600 px-2 py-0.5 rounded">
          {position.type}
        </span>
      </div>

      <div className="p-4">
        <p className="mt-2 font-medium">{position.hospital.name}</p>
        <p className="mt-2">{position.description}</p>

        <button
          onClick={handleApply}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Inscrever-se
        </button>
      </div>
    </div>
  )
}
