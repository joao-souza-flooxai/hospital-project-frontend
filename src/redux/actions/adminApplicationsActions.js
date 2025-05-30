import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL

export const fetchApplicationsAdmin = () => async (dispatch, getState) => {
  const { auth } = getState()

  if (!auth.user || !auth.token) {
    return dispatch({
      type: 'FETCH_APPLICATIONS_ADMIN_FAILURE',
      payload: 'Usuário não autenticado'
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
      payload: error.response?.data?.message || 'Erro ao buscar applications'
    })
  }
}


export const updateApplicationStatus = (applicationId, status) => async (dispatch, getState) => {
  const { auth } = getState()

  if (!auth.user || !auth.token) {
    return
  }

  try {
    await axios.patch(
      `${VITE_API_URL}/admin/dashboard/applications/${applicationId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    )

    dispatch(fetchApplicationsAdmin())
  } catch (error) {
    console.error('Erro ao atualizar status da aplicação', error)
  }
}