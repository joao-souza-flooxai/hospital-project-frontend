import axios from 'axios'
import { errorMessage } from '../../util/errorsMessage'
const VITE_API_URL = import.meta.env.VITE_API_URL

export const fetchApplicationsAdmin = () => async (dispatch, getState) => {
  const { auth } = getState()

  if (!auth.user || !auth.token) {
    return dispatch({
      type: 'FETCH_APPLICATIONS_ADMIN_FAILURE',
      payload: errorMessage({},'Erro ao buscar applications') 
    })
  }

  dispatch({ type: 'FETCH_APPLICATIONS_ADMIN_REQUEST' })

  try {
    const res = await axios.get(`${VITE_API_URL}/admin/dashboard/applications`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    dispatch({
      type: 'FETCH_APPLICATIONS_ADMIN_SUCCESS',
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_APPLICATIONS_ADMIN_FAILURE',
      payload: errorMessage(error,'Erro ao buscar applications' ) 
    })
  }
}


export const updateApplicationStatus = (applicationId, status) => async (dispatch, getState) => {
  const { auth } = getState()

  if (!auth.user || !auth.token) {
    dispatch({
      type: 'UPDATE_APPLICATIONS_ADMIN_FAILURE',
      payload: 'Usuário não autenticado'
    })
    return
  }

  try {
    const response = await axios.patch(
      `${VITE_API_URL}/admin/dashboard/applications/${applicationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    )

    console.log('Response:', response.data)

    const { application, position } = response.data.data

    if (!application) {
      throw new Error('Application não retornado pela API')
    }

    dispatch({
      type: 'UPDATE_APPLICATIONS_ADMIN_SUCCESS',
      payload: application
    })

    if (application.status === 'CLOSED' && position) {
      console.log("oi veio aqui")
      dispatch({
        type: 'ADMIN_REJECTED_APPLICATION_UPDATE_DASHBOARD_POSITION',
        payload: position
      })
    }

  } catch (error) {
    console.error('Erro no updateApplicationStatus:', error.response || error.message || error)

    dispatch({
      type: 'UPDATE_APPLICATIONS_ADMIN_FAILURE',
      payload: errorMessage(error, 'Erro ao atualizar application')
    })
  }
}

