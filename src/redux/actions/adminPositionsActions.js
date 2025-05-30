import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL

export const fetchAdminPositions = ({ filter, page }) => async (dispatch) => {
  try {
    dispatch({ type: 'ADMIN_POSITIONS_REQUEST' })

    const token = localStorage.getItem('token')
    const params = {}

    if (filter) params.filter = filter
    if (page) params.page = page

    const { data } = await axios.get(`${VITE_API_URL}/admin/dashboard/positions`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params
    })

    dispatch({
      type: 'ADMIN_POSITIONS_SUCCESS',
      payload: {
        positions: data.positions,
        totalPages: data.totalPages
      }
    })
  } catch (error) {
    dispatch({
      type: 'ADMIN_POSITIONS_FAIL',
      payload: error.response?.data?.message || error.message
    })
  }
}

export const setAdminFilter = (filter) => ({
  type: 'ADMIN_POSITIONS_SET_FILTER',
  payload: filter
})

export const setAdminPage = (page) => ({
  type: 'ADMIN_POSITIONS_SET_PAGE',
  payload: page
})

export const deletePosition = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'ADMIN_POSITION_DELETE_REQUEST' })

    const token = localStorage.getItem('token')

    await axios.delete(`${VITE_API_URL}/admin/dashboard/positions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    dispatch({
      type: 'ADMIN_POSITION_DELETE_SUCCESS',
      payload: id
    })
  } catch (error) {
    dispatch({
      type: 'ADMIN_POSITION_DELETE_FAIL',
      payload: error.response?.data?.message || error.message
    })
  }
  
}

export const createPosition = (positionData) => async (dispatch) => {
  try {
    dispatch({ type: 'ADMIN_POSITION_CREATE_REQUEST' })

    const token = localStorage.getItem('token')

    const { data } = await axios.post(
      `${VITE_API_URL}/admin/dashboard/positions`,
      positionData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    dispatch({
      type: 'ADMIN_POSITION_CREATE_SUCCESS',
      payload: data
    })
  } catch (error) {
    dispatch({
      type: 'ADMIN_POSITION_CREATE_FAIL',
      payload: error.response?.data?.message || error.message
    })
  }
}

export const updatePosition = (id, positionData) => async (dispatch) => {
  try {
    dispatch({ type: 'ADMIN_POSITION_UPDATE_REQUEST' })

    const token = localStorage.getItem('token')

    const { data } = await axios.put(
      `${VITE_API_URL}/admin/dashboard/positions/${id}`,
      positionData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    dispatch({
      type: 'ADMIN_POSITION_UPDATE_SUCCESS',
      payload: data
    })
  } catch (error) {
    dispatch({
      type: 'ADMIN_POSITION_UPDATE_FAIL',
      payload: error.response?.data?.message || error.message
    })
  }
}


