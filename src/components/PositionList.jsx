import { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchPositions,
  setFilter as setUserFilter,
  setPage as setUserPage
} from '../redux/actions/positionActions'

import {
  fetchAdminPositions,
  setFilter as setAdminFilter,
  setPage as setAdminPage
} from '../redux/actions/adminPositionsActions'

import CardPosition from './CardPosition'
import CreateOrEditPositionModal from './CreateOrEditPositionModal' 

export default function PositionList({ title, isAdmin = false }) {
  const dispatch = useDispatch()
  const {
    positions,
    loading,
    error,
    filter,
    page,
    totalPages
  } = useSelector((state) =>
    isAdmin ? state.adminPositions : state.positions
  )

  const { user } = useSelector((state) => state.auth)

  
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  useEffect(() => {
    const hospitalId = user?.hospital_id

    if (isAdmin) {
      dispatch(fetchAdminPositions({ filter, page, hospitalId }))
    } else {
      dispatch(fetchPositions({ filter, page }))
    }
  }, [dispatch, filter, page, isAdmin, user?.hospital_id])

  const handleSearch = (e) => {
    const action = isAdmin ? setAdminFilter : setUserFilter
    dispatch(action(e.target.value))
  }

  const handlePageChange = (newPage) => {
    const action = isAdmin ? setAdminPage : setUserPage
    dispatch(action(newPage))
  }


  const openCreateModal = () => setIsCreateOpen(true)

  const closeCreateModal = () => setIsCreateOpen(false)

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {/* Botão Criar só para admin */}
      {isAdmin && (
        <div className="mb-4">
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Criar Vaga
          </button>
        </div>
      )}

      {/* Modal para criação */}
      <CreateOrEditPositionModal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        position={null} 
      />

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
            <CardPosition
              key={position.id}
              position={position}
              isAdmin={isAdmin}
            />
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
