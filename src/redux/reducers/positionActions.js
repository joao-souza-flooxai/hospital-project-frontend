import axios from 'axios'

export const fetchPositions = (filter = '', page = 1) => async (dispatch) => {
  dispatch({ type: 'FETCH_POSITIONS_REQUEST' })

  try {
    const response = await axios.get('http://localhost:5554/positions', {
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
