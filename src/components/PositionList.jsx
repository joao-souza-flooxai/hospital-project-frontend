import { useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchPositions,
  setUserFilter,
  setUserPage
} from '../redux/actions/positionActions'

import {
  fetchAdminPositions,
  setAdminFilter,
  setAdminPage
} from '../redux/actions/adminPositionsActions'

import CardPosition from './CardPosition'
import CreateOrEditPositionModal from './CreateOrEditPositionModal' 

export default function PositionList({ title, isAdmin = false, isExpired = false  }) {
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

  const [typeFilter, setTypeFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [minSpotsFilter, setMinSpotsFilter] = useState('')
  const [dateOrder, setDateOrder] = useState('')

  useEffect(() => {
    const hospitalId = user?.hospital_id

    if (isAdmin) {
    dispatch(fetchAdminPositions({ filter, page, hospitalId, isExpired }))
    } else {
      dispatch(fetchPositions(filter, page, isExpired ))
    }
  }, [dispatch, filter, page, isAdmin, user?.hospital_id, isExpired])

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

  const filteredPositions = positions.filter((pos) => {
    const matchesType = typeFilter ? pos.type === typeFilter : true
    const matchesLocation = locationFilter
      ? pos.hospital?.location?.toLowerCase().includes(locationFilter.toLowerCase())
      : true
    const matchesMinSpots = minSpotsFilter
      ? pos.spots >= parseInt(minSpotsFilter)
      : true

    return matchesType && matchesLocation && matchesMinSpots
  })

  const sortedPositions = [...filteredPositions].sort((a, b) => {
    if (dateOrder === 'recent') {
      return new Date(b.created_at) - new Date(a.created_at)
    }
    if (dateOrder === 'expiring') {
      const dateA = a.finished_at ? new Date(a.finished_at) : new Date(8640000000000000)
      const dateB = b.finished_at ? new Date(b.finished_at) : new Date(8640000000000000)
      return dateA - dateB
    }
    return 0
  })

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {(isAdmin && !isExpired) && (
        <div className="mb-4">
          <button
            onClick={openCreateModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Criar Vaga
          </button>
        </div>
      )}

      <CreateOrEditPositionModal
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        position={null} 
      />

     <div className="mb-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Buscar por título..."
        value={filter}
        onChange={handleSearch}
      />
      {!isAdmin && (
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Filtrar por local"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          disabled={isAdmin}
        />
      )}
    </div>


   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="flex justify-around items-center">
        <select
          className="border p-2"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Todos os tipos</option>
          <option value="JOVENS">JOVENS</option>
          <option value="IDOSOS">IDOSOS</option>
          <option value="FAMILIAR">FAMILIAR</option>
        </select>
      </div>


      <div className="flex justify-around items-center">
        <select
          className="border p-2 "
          value={dateOrder}
          onChange={(e) => setDateOrder(e.target.value)}
        >
          <option value="">Data</option>
          <option value="recent">Mais recentes</option>
          {(isAdmin && !isExpired) && (<option value="expiring">Expirando em breve</option>)}
        </select>
      </div>

      <div className="flex justify-around items-center">
        <input
          className="border p-2"
          type="number"
          placeholder="Mínimo de vagas"
          value={minSpotsFilter}
          onChange={(e) => setMinSpotsFilter(e.target.value)}
          min={0}
        />
      </div>
  </div>

  </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {sortedPositions && sortedPositions.length > 0 ? (
          sortedPositions.map((position) => (  
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
