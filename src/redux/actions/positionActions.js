import axios from 'axios'
const VITE_API_URL = import.meta.env.VITE_API_URL

export const fetchPositions = (filter = '', page = 1) => async (dispatch) => {
  dispatch({ type: 'FETCH_POSITIONS_REQUEST' })

  try {
    const response = await axios.get(`${VITE_API_URL}/positions`, {
      params: { search: filter, page }
    })

    dispatch({
      type: 'FETCH_POSITIONS_SUCCESS',
      payload: {
        positions: response.data.positions,
        totalPages: response.data.totalPages
      }
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_POSITIONS_FAILURE',
      payload: error.message
    })
  }
}

export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter
})

export const setPage = (page) => ({
  type: 'SET_PAGE',
  payload: page
})

