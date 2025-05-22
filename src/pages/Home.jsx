import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPositions,
  setFilter,
  setPage
} from '../redux/reducers/positionActions'

export default function Home() {
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
      <h1 className="text-3xl font-bold mb-4 bg-color-red ">Vagas Disponíveis</h1>

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
        {positions.map((position) => (
          <div key={position.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{position.title}</h2>
            <p>{position.description}</p>
          </div>
        ))}
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
