import axios from 'axios'
const VITE_API_URL = import.meta.env.VITE_API_URL

export const applyToPosition = (positions_id) => async (dispatch, getState) => {
  const { auth } = getState()
  console.log(auth.user)
  console.log(auth.user.token)
  if (!auth.user || !auth.token) {
    return dispatch({
      type: 'APPLY_TO_POSITION_FAILURE',
      payload: 'Usuário não autenticado'
    })
  }

  dispatch({ type: 'APPLY_TO_POSITION_REQUEST' })

  try {
    await axios.post(
      `${VITE_API_URL}/user/application`,
      {
        positions_id
      },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    )

    dispatch({ type: 'APPLY_TO_POSITION_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'APPLY_TO_POSITION_FAILURE',
      payload:
        error.response?.data?.message ||
        'Erro ao se inscrever na vaga. Tente novamente.'
    })
  }
}
