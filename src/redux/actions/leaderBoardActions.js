import axios from "axios";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const fetchLeaderboard = (limit = 5) => async (dispatch) => {
  dispatch({ type: 'FETCH_LEADERBOARD_REQUEST' });

  try {
     const response = await axios.get(`${VITE_API_URL}/users/leaderboard?limit=${limit}`);
    dispatch({
      type: 'FETCH_LEADERBOARD_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_LEADERBOARD_FAILURE',
      payload: error.response?.data?.message || error.message,
    });
  }
};
