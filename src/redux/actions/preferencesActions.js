import axios from 'axios'
const VITE_API_URL = import.meta.env.VITE_API_URL
import { errorMessage } from "../../util/errorsMessage";

export const fetchPreferences = () => async (dispatch, getState) => {
  dispatch({ type: "FETCH_PREFERENCES_REQUEST" });

  const { token } = getState().auth;

  try {
    const response = await axios.get(`${VITE_API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({
      type: "FETCH_PREFERENCES_SUCCESS",
      payload: response.data
    });

 
    dispatch({ type: 'AUTH_UPDATE_USER', payload: response.data });

  } catch (error) {
    dispatch({
      type: "FETCH_PREFERENCES_FAILURE",
      payload: errorMessage(error, 'Erro ao carregar os seus dados de perfil!' )
    });
  }
};

export const updatePreferences = (data) => async (dispatch, getState) => {
  dispatch({ type: "UPDATE_PREFERENCES_REQUEST" });

  const { token } = getState().auth;

  try {
    const response = await axios.put(`${VITE_API_URL}/me`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    dispatch({
      type: "UPDATE_PREFERENCES_SUCCESS",
      payload: response.data
    });

    dispatch({ type: 'AUTH_UPDATE_USER', payload: response.data });

  } catch (error) {
    dispatch({
      type: "UPDATE_PREFERENCES_FAILURE",
      payload: errorMessage(error, 'Erro ao atualizar as suas preferências!' )
    });
  }
};
