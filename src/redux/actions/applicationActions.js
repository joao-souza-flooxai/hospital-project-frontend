import axios from 'axios'
const VITE_API_URL = import.meta.env.VITE_API_URL
import { errorMessage } from '../../util/errorsMessage';

export const applyToPosition = (positions_id) => (dispatch, getState) => {
  const { auth } = getState();
  if (!auth.user || !auth.token) {
    return dispatch({
      type: 'APPLY_TO_POSITION_FAILURE',
      payload: errorMessage({},'Usuário não autenticado' )
    });
  }

  dispatch({ type: 'APPLY_TO_POSITION_REQUEST' });

  return axios
    .post(
      `${VITE_API_URL}/user/application`,
      { positions_id },
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }
    )
    .then(() => {
      dispatch({ type: 'APPLY_TO_POSITION_SUCCESS' });
    })
    .catch((error) => {
      dispatch({
        type: 'APPLY_TO_POSITION_FAILURE',
        payload:
          errorMessage(error,' Erro ao se inscrever na vaga. Tente novamente.' )
      });
    });
};

export const fetchUserApplications = () => async (dispatch, getState) => {
  const { auth } = getState()

  if (!auth.user || !auth.token) {
    return dispatch({
      type: 'FETCH_APPLICATIONS_FAILURE',
      payload:  errorMessage({},'Usuário não autenticado' ) 
    })
  }

  dispatch({ type: 'FETCH_APPLICATIONS_REQUEST' })

  try {
    const res = await axios.get(`${VITE_API_URL}/user/applications`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })

    dispatch({
      type: 'FETCH_APPLICATIONS_SUCCESS',
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: 'FETCH_APPLICATIONS_FAILURE',
      payload:
       errorMessage(error, 'Erro ao buscar inscrições. Tente novamente.' )
       
    })
  }

  
}


