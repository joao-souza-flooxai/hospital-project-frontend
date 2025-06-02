import axios from 'axios'
const VITE_API_URL = import.meta.env.VITE_API_URL
import { errorMessage } from "../../util/errorsMessage";

export const fetchPositions = (filter = '', page = 1, isExpired) => async (dispatch) => {
    dispatch({ type: 'FETCH_POSITIONS_REQUEST' })

  try {
    const response = await axios.get(`${VITE_API_URL}/positions`, {
      params: { filter, page, isExpired }
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
      payload: errorMessage(error, 'Erro ao exibir as vagas.' )
    })
  }
}

export const setUserFilter = (filter) => ({
  type: 'SET_FILTER',
  payload: filter
})

export const setUserPage = (page) => ({
  type: 'SET_PAGE',
  payload: page
})

export const setAdminOrder = (orderBy) => ({
  type: 'ADMIN_POSITIONS_SET_ORDER',
  payload: orderBy,
})


