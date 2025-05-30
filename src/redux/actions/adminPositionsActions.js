import axios from 'axios'
import { errorMessage } from '../../util/errorsMessage'
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
      payload: errorMessage(error,'Erro ao buscar positions.' ) 
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
      payload: errorMessage(error,'Erro ao deletar position.' ) 
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
      payload: errorMessage(error,'Erro ao criar uma position.' ) 
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
      payload: errorMessage(error,'Erro atualizar ao atualizar a position.' ) 
    })
  }
}


