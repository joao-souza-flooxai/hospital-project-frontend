const initialState = {
  data: [],
  loading: false,
  error: null,
  success: false,
};

export const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LEADERBOARD_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_LEADERBOARD_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_LEADERBOARD_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
