import { useEffect } from 'react'
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

import PositionList from './PositionList'
import Collapse from './Collapse'

export default function PositionFetcher({ isAdmin = false }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const state = useSelector((state) =>
    isAdmin ? state.adminPositions : state.positions
  )

  const {
    positions,
    loading,
    error,
    filter,
    page,
    totalPages
  } = state

  const hospitalId = user?.hospital_id

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchAdminPositions({ filter, page, hospitalId }))
    } else {
      dispatch(fetchPositions(filter, page))
    }
  }, [dispatch, filter, page, isAdmin, hospitalId])

  const handleSearch = (e) => {
    const action = isAdmin ? setAdminFilter : setUserFilter
    dispatch(action(e.target.value))
  }

  const handlePageChange = (newPage) => {
    const action = isAdmin ? setAdminPage : setUserPage
    dispatch(action(newPage))
  }

  const now = new Date()

  const openPositions = positions.filter(
    (pos) =>
      (!pos.finished_at || new Date(pos.finished_at) > now) &&
      pos.spots > 0
  )

  const expiredPositions = positions.filter(
    (pos) => pos.finished_at && new Date(pos.finished_at) <= now
  )

  const closedPositions = positions.filter(
    (pos) => pos.spots <= 0 && (!pos.finished_at || new Date(pos.finished_at) > now)
  )

  if (isAdmin) {
    return (
      <>
        <Collapse title="Vagas Abertas do seu Hospital" isItToBeOpen={false}>
          <PositionList
            positions={openPositions}
            loading={loading}
            error={error}
            filter={filter}
            onSearch={handleSearch}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isAdmin={true}
            isExpired={false}
            isCreating={true}
          />
        </Collapse>

        <Collapse title="Vagas Encerradas do seu Hospital (spots esgotados)" isItToBeOpen={false}>
          <PositionList
            positions={closedPositions}
            loading={loading}
            error={error}
            filter={filter}
            onSearch={handleSearch}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isAdmin={true}
            isExpired={false}
          />
        </Collapse>

        <Collapse title="Vagas Expiradas do seu Hospital (prazo encerrado)" isItToBeOpen={false}>
          <PositionList
            positions={expiredPositions}
            loading={loading}
            error={error}
            filter={filter}
            onSearch={handleSearch}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isAdmin={true}
            isExpired={true}
          />
        </Collapse>
      </>
    )
  }

  return (
    <PositionList
      positions={positions}
      loading={loading}
      error={error}
      filter={filter}
      onSearch={handleSearch}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      isAdmin={false}
      isExpired={false}
    />
  )
}
