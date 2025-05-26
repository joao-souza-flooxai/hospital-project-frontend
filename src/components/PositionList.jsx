import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPositions,
  setFilter,
  setPage
} from '../redux/actions/positionActions'

import CardPosition from './CardPosition'
//Mais tarde terá que receber as props
export default function PositionList({ title = 'Trabalhos Voluntários Disponíveis' }) {
  const dispatch = useDispatch()
  const { positions, loading, error, filter, page, totalPages } = useSelector(
    (state) => state.positions
  )

  useEffect(() => {
    dispatch(fetchPositions(filter, page))
  }, [dispatch, filter, page])

  const handleSearch = (e) => {
    dispatch(setFilter(e.target.value))
  }

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage))
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <input
        className="border p-2 mb-4 w-full"
        type="text"
        placeholder="Buscar por título..."
        value={filter}
        onChange={handleSearch}
      />

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {positions && positions.length > 0 ? (
          positions.map((position) => (
            <CardPosition key={position.id} position={position} />
          ))
        ) : (
          <span>Sem vagas no momento.</span>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-3 py-1 rounded ${
              num === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}
