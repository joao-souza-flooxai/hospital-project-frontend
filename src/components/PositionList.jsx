import { useState } from 'react'
import CardPosition from './CardPosition'
import CreateOrEditPositionModal from './CreateOrEditPositionModal'

export default function PositionList({
  title,
  positions = [],
  loading,
  error,
  filter,
  onSearch,
  // page,
  // totalPages,
  // onPageChange,
  isAdmin = false,
  isExpired = false,
}) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [typeFilter, setTypeFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [minSpotsFilter, setMinSpotsFilter] = useState('')
  const [dateOrder, setDateOrder] = useState('')
  const [hospitalFilter, setHospitalFilter] = useState('')

  const filteredPositions = positions.filter((pos) => {
    const matchesType = typeFilter ? pos.type === typeFilter : true
    const matchesLocation = locationFilter
      ? pos.hospital?.location?.toLowerCase().includes(locationFilter.toLowerCase())
      : true
    const matchesMinSpots = minSpotsFilter
      ? pos.spots >= parseInt(minSpotsFilter)
      : true
    const matchesHospital = hospitalFilter
      ? pos.hospital?.name?.toLowerCase().includes(hospitalFilter.toLowerCase())
      : true

    return matchesType && matchesLocation && matchesMinSpots && matchesHospital
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
            onClick={() => setIsCreateOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Criar Vaga
          </button>
        </div>
      )}

      <CreateOrEditPositionModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        position={null}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Buscar por título..."
          value={filter}
          onChange={onSearch}
        />
        {!isAdmin && (
          <>
            <input
              className="border p-2 w-full"
              type="text"
              placeholder="Filtrar por local"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
            <input
              className="border p-2 w-full"
              type="text"
              placeholder="Filtrar por hospital"
              value={hospitalFilter}
              onChange={(e) => setHospitalFilter(e.target.value)}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
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

        <select
          className="border p-2"
          value={dateOrder}
          onChange={(e) => setDateOrder(e.target.value)}
        >
          <option value="">Data</option>
          <option value="recent">Mais recentes</option>
          {(isAdmin && !isExpired) && <option value="expiring">Expirando em breve</option>}
        </select>

        <input
          className="border p-2"
          type="number"
          placeholder="Mínimo de vagas"
          value={minSpotsFilter}
          onChange={(e) => setMinSpotsFilter(e.target.value)}
          min={0}
        />
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {sortedPositions.length > 0 ? (
          sortedPositions.map((position) => (
            <CardPosition key={position.id} position={position} isAdmin={isAdmin} />
          ))
        ) : (
          <p>Nenhuma vaga encontrada.</p>
        )}
      </div>

    </div>
  )
}
