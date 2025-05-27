import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAdminPositions } from '../redux/actions/adminPositionsActions'

export default function PositionsToApprove() {
  const dispatch = useDispatch()
  const { positions, loading, error } = useSelector(
    (state) => state.positions
  )

    useEffect(() => {
        dispatch(fetchAdminPositions())
    }, [dispatch])

  if (loading) return <p className="mt-4">Carregando vagas...</p>
  if (error) return <p className="mt-4 text-red-500">{error}</p>
  if (!positions.length)
    return <p className="mt-4">Nenhuma vaga ativa no seu hospital.</p>

  return (
    <div className="mt-10 max-w-4xl w-full">
      <h2 className="text-2xl font-semibold mb-6">Vagas Abertas do seu Hospital</h2>
      <div className="space-y-4">
        {positions.map((pos) => (
          <div
            key={pos.id}
            className="border rounded p-4 flex flex-col md:flex-row justify-between"
          >
            <div>
              <p className="font-medium text-lg">
                 <strong>{pos.title}</strong>
              </p>
              <p className="text-sm mt-1">{pos.description}</p>
              <p className="text-sm mt-1">
                Quantidade de vagas: <strong>{pos.spots}</strong>
              </p>
              <p
                className={`mt-1 inline-block px-2 py-1 text-xs rounded-full ${
                  pos.status === 'ACTIVE'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {pos.status === 'ACTIVE' ? 'Ativa' : pos.status}
              </p>
            </div>
            <div className="mt-3 md:mt-0 md:text-right space-x-2">
              <button className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600">
                Editar
              </button>
              <button className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
