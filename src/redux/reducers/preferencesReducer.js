const initialState = {
  loading: false,
  data: null,
  error: null
};

export const preferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PREFERENCES_REQUEST':
    case 'UPDATE_PREFERENCES_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_PREFERENCES_SUCCESS':
    case 'UPDATE_PREFERENCES_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'FETCH_PREFERENCES_FAILURE':
    case 'UPDATE_PREFERENCES_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
